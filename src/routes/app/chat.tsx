import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUp,
  ChevronRight,
  ImagePlus,
  RotateCcw,
  Sprout,
  TriangleAlert,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  chatApi,
  etapeEchouee,
  EXTENSIONS_IMAGE,
  QUESTION_MAX,
  QUESTION_MIN,
  TAILLE_IMAGE_MAX,
  type CatalogueAgents,
  type Etape,
} from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { erreurChat } from "@/lib/erreurs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [{ title: "Chat — Deep Farm" }, { name: "robots", content: "noindex" }],
  }),
  component: ChatPage,
});

/**
 * What the next question will carry.
 *
 * A photo is uploaded once. From the answer on it is only a path, which the
 * API accepts back — that is what spares a second 3 MB upload for "and is it
 * serious?". `apercu` is a local object URL either way: no route serves an
 * uploaded photo back, so the preview can only come from this browser.
 */
type PieceJointe =
  | { type: "fichier"; fichier: File; nom: string; apercu: string }
  | { type: "chemin"; chemin: string; nom: string; apercu: string };

type Message = {
  id: string;
  role: "moi" | "agent";
  texte: string;
  /**
   * User side: the photo the question carried. `reprise` marks a photo that
   * was already sent — shown as a compact reminder, since re-rendering it
   * full size on every follow-up would swamp the thread.
   */
  photo?: { apercu: string; nom: string; reprise: boolean };
  /** Agent side: the chain the orchestrator ran to produce this answer. */
  etapes?: Etape[];
  /** Agent slot holding a failed exchange rather than an answer. */
  erreur?: boolean;
};

const SUGGESTIONS = [
  "app.chat.suggestion.1",
  "app.chat.suggestion.2",
  "app.chat.suggestion.3",
  "app.chat.suggestion.4",
];

/**
 * Readable names for the agents shipped today. The catalogue grows, so an id
 * that is missing here falls back to the id itself rather than a wrong label
 * (CONTRAT_CHAT.md, section 2).
 */
const LIBELLES: Record<string, string> = {
  rag_image: "app.chat.agent.rag_image",
  rag_texte: "app.chat.agent.rag_texte",
  meteo: "app.chat.agent.meteo",
};

const identifiant = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Math.random());

/** Mirrors the API's own checks, to fail on the spot instead of after upload. */
function problemePhoto(fichier: File): string | null {
  const point = fichier.name.lastIndexOf(".");
  const extension = point === -1 ? "" : fichier.name.slice(point).toLowerCase();
  if (!EXTENSIONS_IMAGE.includes(extension)) return "app.chat.image.error.format";
  if (fichier.size === 0) return "app.chat.image.error.empty";
  if (fichier.size > TAILLE_IMAGE_MAX) return "app.chat.image.error.size";
  return null;
}

function ChatPage() {
  const { t } = useI18n();
  const { utilisateur } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [saisie, setSaisie] = useState("");
  const [piece, setPiece] = useState<PieceJointe | null>(null);
  const [refusPhoto, setRefusPhoto] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [catalogue, setCatalogue] = useState<CatalogueAgents | null>(null);

  // Kept so a failed exchange can be replayed without retyping it.
  const dernier = useRef<{ question: string; piece: PieceJointe | null }>({
    question: "",
    piece: null,
  });
  const fin = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLTextAreaElement>(null);
  const fichierInput = useRef<HTMLInputElement>(null);

  // Previews outlive the composer: a thumbnail stays in the thread after the
  // attachment is cleared, so they are only released when the page goes.
  const apercus = useRef<string[]>([]);
  useEffect(() => {
    const urls = apercus.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  // Only used to caption the steps: a failure here costs nothing but tooltips.
  useEffect(() => {
    chatApi
      .agents()
      .then(setCatalogue)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, envoi]);

  const choisirPhoto = (fichier: File | undefined) => {
    if (!fichier) return;
    const probleme = problemePhoto(fichier);
    if (probleme) return setRefusPhoto(t(probleme));

    setRefusPhoto(null);
    const apercu = URL.createObjectURL(fichier);
    apercus.current.push(apercu);
    setPiece({ type: "fichier", fichier, nom: fichier.name, apercu });
  };

  const envoyer = async (texte: string, jointe: PieceJointe | null) => {
    if (envoi) return;
    const propre = texte.trim();
    // A new photo can travel without a question — the API supplies its own.
    // Anything else has to clear the API's minimum length.
    const televersement = jointe?.type === "fichier";
    if (!televersement && propre.length < QUESTION_MIN) return;

    dernier.current = { question: propre, piece: jointe };
    setRefusPhoto(null);
    setMessages((m) => [
      ...m,
      {
        id: identifiant(),
        role: "moi",
        texte: propre,
        photo: jointe
          ? { apercu: jointe.apercu, nom: jointe.nom, reprise: jointe.type === "chemin" }
          : undefined,
      },
    ]);
    setSaisie("");
    if (champ.current) champ.current.style.height = "auto";
    setEnvoi(true);

    try {
      const reponse = televersement
        ? await chatApi.televerser(jointe.fichier, propre || undefined)
        : await chatApi.demander(propre, jointe?.type === "chemin" ? jointe.chemin : undefined);

      setMessages((m) => [
        ...m,
        {
          id: identifiant(),
          role: "agent",
          texte: reponse.reponse,
          etapes: reponse.etapes ?? [],
        },
      ]);

      // The photo now lives on the server: keep it as a path so the next
      // question rides along without a second upload.
      if (televersement && reponse.image) {
        setPiece({ type: "chemin", chemin: reponse.image, nom: jointe.nom, apercu: jointe.apercu });
      }
    } catch (err) {
      // The attachment stays put on failure, so "try again" can replay it.
      setMessages((m) => [
        ...m,
        { id: identifiant(), role: "agent", texte: erreurChat(err, t), erreur: true },
      ]);
    } finally {
      setEnvoi(false);
      champ.current?.focus();
    }
  };

  /** Drops the failed answer and replays the question that produced it. */
  const reessayer = () => {
    setMessages((m) => {
      const sansErreur = [...m];
      // Remove the error bubble and the question above it: `envoyer` re-adds both.
      if (sansErreur.at(-1)?.erreur) sansErreur.pop();
      if (sansErreur.at(-1)?.role === "moi") sansErreur.pop();
      return sansErreur;
    });
    void envoyer(dernier.current.question, dernier.current.piece);
  };

  const surTouche = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter breaks the line. `isComposing` guards IME input,
    // where Enter validates the candidate rather than the message.
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void envoyer(saisie, piece);
    }
  };

  const auto = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSaisie(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const vide = messages.length === 0;
  const prete = piece?.type === "fichier" || saisie.trim().length >= QUESTION_MIN;

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Empty, the welcome sits centred in the free space; once the thread
            starts, the same column flows from the top. */}
        <div
          className={`mx-auto flex w-full max-w-3xl flex-col px-4 py-8 sm:px-6 ${
            vide ? "min-h-full justify-center" : ""
          }`}
        >
          {vide ? (
            <Accueil
              prenom={utilisateur?.nom_complet.split(" ")[0] ?? ""}
              onChoisir={(texte) => void envoyer(texte, null)}
            />
          ) : (
            <div className="space-y-6">
              {messages.map((message) =>
                message.role === "moi" ? (
                  <Question key={message.id} texte={message.texte} photo={message.photo} />
                ) : (
                  <Reponse
                    key={message.id}
                    message={message}
                    catalogue={catalogue}
                    onReessayer={message.erreur ? reessayer : undefined}
                  />
                ),
              )}
              {envoi && <Attente />}
            </div>
          )}
          <div ref={fin} />
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-background">
        <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void envoyer(saisie, piece);
            }}
            className="rounded-2xl border border-border bg-card p-2 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15"
          >
            {piece && <Apercu piece={piece} onRetirer={() => setPiece(null)} />}

            <div className="flex items-end gap-2">
              <input
                ref={fichierInput}
                type="file"
                accept={EXTENSIONS_IMAGE.join(",")}
                className="hidden"
                onChange={(e) => {
                  choisirPhoto(e.target.files?.[0]);
                  // Reset, so re-picking the same file fires `change` again.
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9 shrink-0 rounded-xl text-muted-foreground hover:text-foreground"
                onClick={() => fichierInput.current?.click()}
                disabled={envoi}
                aria-label={t("app.chat.image.add")}
                title={t("app.chat.image.add")}
              >
                <ImagePlus className="size-4" />
              </Button>

              <textarea
                ref={champ}
                rows={1}
                value={saisie}
                onChange={auto}
                onKeyDown={surTouche}
                maxLength={QUESTION_MAX}
                placeholder={t(
                  piece?.type === "fichier" ? "app.chat.placeholder.photo" : "app.chat.placeholder",
                )}
                aria-label={t("app.chat.placeholder")}
                className="max-h-[200px] flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
              />

              <Button
                type="submit"
                size="icon"
                className="size-9 shrink-0 rounded-xl"
                disabled={envoi || !prete}
                aria-label={t("app.chat.send")}
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
          </form>

          {refusPhoto && (
            <p
              role="alert"
              className="mt-2 flex items-center justify-center gap-1.5 text-xs text-destructive"
            >
              <AlertCircle className="size-3.5 shrink-0" />
              {refusPhoto}
            </p>
          )}

          {/* Surfaced next to the composer rather than in the intro: it only
              matters once there is a previous question to (wrongly) rely on. */}
          {!vide && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {t("app.chat.nomemory")}
            </p>
          )}
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {t("app.chat.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}

function Apercu({ piece, onRetirer }: { piece: PieceJointe; onRetirer: () => void }) {
  const { t } = useI18n();

  return (
    <div className="mb-2 flex items-center gap-3 rounded-xl bg-muted/50 p-2">
      <img
        src={piece.apercu}
        alt={t("app.chat.image.alt")}
        className="size-10 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{piece.nom}</p>
        <p className="truncate text-xs text-muted-foreground">
          {/* Already on the server: say so, otherwise keeping it attached for
              the next question looks like a bug. */}
          {t(piece.type === "chemin" ? "app.chat.image.reuse" : "app.chat.image.hint")}
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0 text-muted-foreground hover:text-foreground"
        onClick={onRetirer}
        aria-label={t("app.chat.image.remove")}
      >
        <X className="size-3.5" />
      </Button>
    </div>
  );
}

function Accueil({ prenom, onChoisir }: { prenom: string; onChoisir: (texte: string) => void }) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center py-10 text-center sm:py-16">
      <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <Sprout className="size-6" />
      </span>

      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {prenom ? `${t("app.chat.greeting")}, ${prenom}.` : `${t("app.chat.greeting")}.`}
      </h2>
      <p className="mt-3 max-w-md text-balance text-sm text-muted-foreground sm:text-base">
        {t("app.chat.intro")}
      </p>

      <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((cle) => (
          <button
            key={cle}
            type="button"
            onClick={() => onChoisir(t(cle))}
            className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary-soft/40 hover:text-foreground"
          >
            {t(cle)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Question({ texte, photo }: { texte: string; photo?: Message["photo"] }) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-end gap-2">
      {photo &&
        (photo.reprise ? (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <img
              src={photo.apercu}
              alt={t("app.chat.image.alt")}
              className="size-6 rounded object-cover"
            />
            <span className="max-w-[16rem] truncate">{photo.nom}</span>
          </p>
        ) : (
          <img
            src={photo.apercu}
            alt={t("app.chat.image.alt")}
            className="max-h-48 max-w-[70%] rounded-2xl rounded-br-md border border-border"
          />
        ))}
      {texte && (
        <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md border border-primary/20 bg-primary-soft px-4 py-2.5 text-sm leading-relaxed">
          {texte}
        </p>
      )}
    </div>
  );
}

function Reponse({
  message,
  catalogue,
  onReessayer,
}: {
  message: Message;
  catalogue: CatalogueAgents | null;
  onReessayer?: () => void;
}) {
  const { t } = useI18n();
  const { texte, etapes, erreur } = message;

  // An agent can fail while the call still returns 200: the incident only
  // shows up inside a step (CONTRAT_CHAT.md, section 4).
  const partiel = (etapes ?? []).some((e) => etapeEchouee(e.sortie));

  return (
    <div className="flex gap-3">
      <span
        className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${
          erreur ? "bg-destructive/10 text-destructive" : "bg-primary text-primary-foreground"
        }`}
        aria-hidden
      >
        {erreur ? <AlertCircle className="size-4" /> : <Sprout className="size-3.5" />}
      </span>

      <div className="min-w-0 flex-1">
        <p
          role={erreur ? "alert" : undefined}
          className={`whitespace-pre-wrap text-sm leading-relaxed ${
            erreur ? "text-destructive" : "text-foreground"
          }`}
        >
          {texte}
        </p>

        {partiel && (
          <p className="mt-2 flex items-start gap-1.5 text-xs text-earth">
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
            {t("app.chat.steps.partial")}
          </p>
        )}

        {/* No steps means the orchestrator answered by itself — a greeting or a
            request for detail. Nothing to justify. */}
        {etapes && etapes.length > 0 && <Etapes etapes={etapes} catalogue={catalogue} />}

        {onReessayer && (
          <Button variant="outline" size="sm" className="mt-3" onClick={onReessayer}>
            <RotateCcw className="mr-2 size-3.5" />
            {t("app.chat.retry")}
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * The chain behind an answer. Folded by default: it is a justification, not
 * the answer — but without it a reply seems to come from nowhere.
 */
function Etapes({ etapes, catalogue }: { etapes: Etape[]; catalogue: CatalogueAgents | null }) {
  const { t } = useI18n();
  const [ouvert, setOuvert] = useState(false);

  return (
    <Collapsible open={ouvert} onOpenChange={setOuvert} className="mt-3">
      <CollapsibleTrigger className="flex items-center gap-1.5 rounded-md text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
        <ChevronRight className={`size-3.5 transition-transform ${ouvert ? "rotate-90" : ""}`} />
        {t("app.chat.steps.title")}
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] tabular-nums">
          {etapes.length}
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3 space-y-3 border-l border-border pl-4">
        {etapes.map((etape, i) => {
          const echec = etapeEchouee(etape.sortie);
          const cle = LIBELLES[etape.agent];
          // Unknown agent: show the raw id rather than mislabel it.
          const nom = cle ? t(cle) : etape.agent;

          return (
            <div key={`${etape.agent}-${i}`} className="text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    echec ? "bg-destructive/10 text-destructive" : "bg-primary-soft text-foreground"
                  }`}
                  title={catalogue?.agents[etape.agent]}
                >
                  {nom}
                </span>
                <span className="min-w-0 break-all text-muted-foreground">{etape.consigne}</span>
              </div>

              <p
                className={`mt-1.5 whitespace-pre-wrap leading-relaxed ${
                  echec ? "text-destructive" : "text-foreground/70"
                }`}
              >
                {etape.sortie}
              </p>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

/**
 * The answer lands in one go after 10 to 35 seconds — no streaming — so the
 * wait needs to show that something is still happening.
 */
function Attente() {
  const { t } = useI18n();
  const [secondes, setSecondes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSecondes((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3">
      <span
        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"
        aria-hidden
      >
        <Sprout className="size-3.5" />
      </span>

      <div className="min-w-0 flex-1" role="status">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          {t("app.chat.waiting")}
          <span className="flex gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </span>
          <span className="tabular-nums text-xs">{secondes}s</span>
        </p>

        {/* Past a normal single-step answer, say why it is taking so long. */}
        {secondes >= 15 && (
          <p className="mt-1 text-xs text-muted-foreground/80">{t("app.chat.waiting.long")}</p>
        )}
      </div>
    </div>
  );
}
