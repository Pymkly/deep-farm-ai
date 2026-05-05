import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "fr";

type Dict = Record<string, string>;

const STORAGE_KEY = "deepfarm.locale";

const en: Dict = {
  // Nav
  "nav.project": "The Project",
  "nav.how": "How It Works",
  "nav.impact": "Impact",
  "nav.iot": "Solar IoT",
  "nav.science": "Science & Tech",
  "nav.team": "Team",
  "nav.news": "News",
  "nav.contact": "Contact",
  "nav.arch.pipeline": "Pipeline",
  "nav.arch.agents": "The four agents",
  "nav.arch.decisions": "Trade-offs",
  "nav.arch.opensource": "Open source",
  "header.signin": "Sign in",

  // Announcement bar
  "announcement.text":
    "Deep Farm will be presented at the 1st Indian Ocean AI Summit — May 28–29, 2026, Antananarivo",
  "announcement.boldFragment": "1st Indian Ocean AI Summit",
  "announcement.eyebrow": "Featured at",
  "announcement.date": "Antananarivo · May 28–29, 2026",
  "announcement.learnMore": "Learn more",
  "announcement.dismiss": "Dismiss announcement",

  // Hero
  "hero.badge": "Open-source · Erasmus+ #101128032",
  "hero.title": "AI for Rice Farmers in Madagascar",
  "hero.subtitle":
    "An open-source, multi-agent digital tutor combining solar IoT and Agentic AI to transform Malagasy rice farming.",
  "hero.cta.discover": "Discover the project",
  "hero.cta.watch": "Watch the demo",
  "hero.partners": "In partnership with",

  // Challenge
  "challenge.eyebrow": "The Challenge",
  "challenge.title": "Madagascar, once self-sufficient, now imports rice.",
  "challenge.p1.before": "Rice represents ",
  "challenge.p1.bold": "43% of agricultural value added",
  "challenge.p1.after":
    " and is eaten at every meal — yet the country imports hundreds of thousands of tons each year to meet demand.",
  "challenge.p2.before": "National yields stagnate at ",
  "challenge.p2.bold": "2.8 t/ha",
  "challenge.p2.after":
    ", more than two times lower than comparable Asian basins (~6 t/ha), despite identical agro-climatic potential.",
  "challenge.p3.before": "Decades of ",
  "challenge.p3.bold": "ANAE expert knowledge",
  "challenge.p3.after":
    " remain locked in PDF reports that never reach the farmer holding the spraying decision in their hand.",
  "challenge.quote":
    "“30% of rice losses in sub-Saharan Africa are due to diseases and environmental stress.”",
  "challenge.quoteSource": "FAO · 2023",
  "challenge.statLabel": "National rice yield",
  "challenge.imageAlt":
    "A Malagasy rice farmer in his paddy holding a smartphone",

  // Key Figures
  "figures.eyebrow": "By the numbers",
  "figures.title": "Tangible impact, measured in the field.",
  "figures.intro":
    "Pilot results from 18 plots in Iarinarivo over the 2025 cropping season, independently verified with ANAE protocols.",

  // Solution
  "solution.eyebrow": "Our Solution",
  "solution.title":
    "Three layers, one digital tutor in every farmer's pocket.",
  "solution.iot.title": "Solar IoT Stations",
  "solution.iot.p1": "12 autonomous solar stations",
  "solution.iot.p2": "68-day battery life",
  "solution.iot.p3": "NPK + water + climate sensors",
  "solution.iot.p4": "~80€ per family",
  "solution.ai.title": "Agentic AI Tutor",
  "solution.ai.p1":
    "4 specialized agents (Document, Image, Time Series, Weather)",
  "solution.ai.p2": "LangGraph orchestration",
  "solution.ai.p3": "RAG on 42,000 ANAE pages",
  "solution.ai.p4": "Open-source LLM",
  "solution.app.title": "Mobile App",
  "solution.app.p1": "Photo → diagnosis in <1 minute",
  "solution.app.p2": "94% accuracy",
  "solution.app.p3": "Sources cited from local documents",
  "solution.app.p4": "Offline-first design",

  // Solar IoT
  "solar.eyebrow": "Hardware · Edge AI",
  "solar.title": "Solar IoT in the field",
  "solar.intro":
    "Deep Farm deploys autonomous solar IoT stations directly in rice fields. Each station collects soil and climate data every few seconds, runs offline for over 2 months without sun, and shares the data with our AI tutor.",
  "solar.step.panel": "Solar panel",
  "solar.step.sensors": "Field sensors",
  "solar.step.hub": "Raspberry Pi hub",
  "solar.step.cloud": "Cloud",
  "solar.step.app": "Farmer app",
  "solar.npk.name": "NPK Soil Sensor",
  "solar.npk.detail":
    "Measures Nitrogen, Phosphorus, Potassium in real time via RS-485 Modbus.",
  "solar.dht.name": "DHT22 Climate Sensor",
  "solar.dht.detail":
    "Tracks air temperature and humidity, key indicators of disease risk.",
  "solar.tl.name": "TL-136 Water Level",
  "solar.tl.detail":
    "Monitors irrigation depth with IP68 waterproof probe (4-20 mA output).",
  "solar.hub.name": "Solar-powered Hub",
  "solar.hub.detail":
    "Arduino Mega + ESP-01S + Raspberry Pi. 12V solar battery, 68-day autonomy without recharge.",
  "solar.cta": "Learn more about our architecture",
  "solar.imageAlt":
    "Diagram: solar panel powering field sensors connected to a Raspberry Pi station, syncing to the cloud and a farmer's smartphone",

  // Demo
  "demo.eyebrow": "See it in action",
  "demo.title": "From a leaf photo to a sourced diagnosis in under a minute.",
  "demo.step1.title": "Capture",
  "demo.step1.body":
    "The farmer snaps a diseased leaf — the app works fully offline.",
  "demo.step1.scan": "Tap to scan a leaf",
  "demo.step2.title": "Reason",
  "demo.step2.body":
    "Four specialized agents collaborate via LangGraph orchestration.",
  "demo.step2.active": "active",
  "demo.step3.title": "Recommend",
  "demo.step3.body":
    "Every recommendation is grounded in a citable local document.",
  "demo.step3.confidence": "Diagnosis · 94% confidence",
  "demo.step3.disease": "Bacterial Blight",
  "demo.step3.recommendation":
    "Apply copper-based bactericide. Drain plot for 48h, then re-flood. Remove affected tillers.",
  "demo.step3.source": "Source: ANAE 2024, p. 42",
  "demo.cta": "Try the interactive demo",
  "demo.agent.document": "Document Agent",
  "demo.agent.image": "Image Agent",
  "demo.agent.timeSeries": "Time Series Agent",
  "demo.agent.weather": "Weather Agent",

  // Pilot Farm
  "pilot.eyebrow": "Pilot Farm",
  "pilot.title": "Live from our pilot farm in Iarinarivo, Madagascar.",
  "pilot.body":
    "Twelve solar IoT stations stream NPK, water-level, and microclimate data every fifteen minutes — all of it feeding the same agentic system that farmers query from their phones.",
  "pilot.stat.plots": "plots monitored",
  "pilot.stat.surface": "active surface",
  "pilot.stat.stations": "solar stations deployed",
  "pilot.stat.regions": "regions covered",
  "pilot.cta": "Explore the project",

  // Partners
  "partners.eyebrow": "Backed by leading institutions",
  "partners.placeholderNotice":
    "Logo placeholders — replace with official artwork",

  // IOAI
  "ioai.badge": "Featured Event",
  "ioai.title": "Deep Farm at the 1st Indian Ocean AI Summit",
  "ioai.body":
    "Join us on May 28–29, 2026 in Antananarivo, under the patronage of the Prime Minister of Madagascar.",
  "ioai.date": "May 28–29, 2026",
  "ioai.location": "Antananarivo, Madagascar",
  "ioai.cta": "Learn more about IOAI 2026",

  // Get Involved
  "getInvolved.eyebrow": "Get involved",
  "getInvolved.title": "Three ways to grow this with us.",
  "getInvolved.ngo.audience": "For NGOs & funders",
  "getInvolved.ngo.title": "Support a regional deployment",
  "getInvolved.ngo.desc":
    "Partner with us to bring Deep Farm to a new region. Every 80€ equips one family for a full season.",
  "getInvolved.ngo.cta": "Get in touch",
  "getInvolved.researcher.audience": "For researchers",
  "getInvolved.researcher.title": "Collaborate or fork on GitHub",
  "getInvolved.researcher.desc":
    "MIT licensed. Reproduce our experiments, contribute agents, or extend RAG to other crops.",
  "getInvolved.researcher.cta": "View repository",
  "getInvolved.institution.audience": "For institutions",
  "getInvolved.institution.title": "Integrate Deep Farm via MCP",
  "getInvolved.institution.desc":
    "Plug our agentic tutor into your existing extension services using the Model Context Protocol.",
  "getInvolved.institution.cta": "Read documentation",

  // Footer
  "footer.tagline":
    "Open-source, multi-agent digital tutor for Malagasy rice farmers. Built with ESTIA, IT University, UNIVA and ANAE — funded by Erasmus+.",
  "footer.col.explore": "Explore",
  "footer.col.resources": "Resources",
  "footer.col.contact": "Contact",
  "footer.link.project": "The Project",
  "footer.link.how": "How It Works",
  "footer.link.impact": "Impact",
  "footer.link.science": "Science & Tech",
  "footer.link.team": "Team",
  "footer.link.news": "News",
  "footer.link.github": "GitHub",
  "footer.link.docs": "Documentation",
  "footer.link.research": "Research papers",
  "footer.link.press": "Press kit",
  "footer.link.contact": "Contact",
  "footer.eu":
    "Co-funded by the European Union — Erasmus+ project #101128032. The views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union.",
  "footer.legal": "Legal",
  "footer.privacy": "Privacy",

  // Architecture page — Hero
  "arch.back": "Back to home",
  "arch.eyebrow": "Technical deep-dive",
  "arch.title": "How Deep Farm works — Architecture",
  "arch.intro":
    "Deep Farm combines solar-powered IoT, vector search, and a multi-agent AI system to deliver personalized rice-farming advice in under one minute. Here's how the pieces fit together.",

  // Architecture page — Pipeline
  "arch.pipeline.eyebrow": "The full picture",
  "arch.pipeline.title": "Four layers, one pipeline",
  "arch.layer.iot": "IoT layer",
  "arch.layer.iot.1": "Solar stations",
  "arch.layer.iot.2": "Arduino Mega",
  "arch.layer.iot.3": "ESP-01S Wi-Fi",
  "arch.layer.iot.4": "Raspberry Pi hub",
  "arch.layer.backend": "Backend layer",
  "arch.layer.backend.1": "FastAPI gateway",
  "arch.layer.backend.2": "MongoDB time-series",
  "arch.layer.backend.3": "Milvus vectors",
  "arch.layer.backend.4": "PostgreSQL metadata",
  "arch.layer.ai": "AI layer",
  "arch.layer.ai.1": "LangGraph supervisor",
  "arch.layer.ai.2": "4 specialist agents",
  "arch.layer.ai.3": "DeepSeek LLM",
  "arch.layer.ai.4": "Tool routing & retries",
  "arch.layer.ui": "Interface layer",
  "arch.layer.ui.1": "Mobile app (offline-first)",
  "arch.layer.ui.2": "Web platform",
  "arch.layer.ui.3": "MCP protocol",
  "arch.layer.ui.4": "Cooperative dashboards",

  // Architecture page — Agents
  "arch.agents.eyebrow": "The crew",
  "arch.agents.title": "The four agents",
  "arch.agent.doc.name": "Document Agent",
  "arch.agent.doc.detail":
    "RAG over 42,000 ANAE pages using nomic-embed-text-v1.5 embeddings.",
  "arch.agent.image.name": "Image Agent",
  "arch.agent.image.detail":
    "Vector similarity search using nomic-embed-vision-v1.5 (94% accuracy on rice diseases).",
  "arch.agent.timeseries.name": "Time Series Agent",
  "arch.agent.timeseries.detail":
    "Analyzes sensor data from MongoDB time-series collections.",
  "arch.agent.weather.name": "Weather Agent",
  "arch.agent.weather.detail": "Connects to OpenMeteo API for forecasts.",

  // Architecture page — Decisions
  "arch.decisions.eyebrow": "Trade-offs",
  "arch.decisions.title": "Why these technology choices?",
  "arch.decision.cnn.q": "Why vector search over CNN classification?",
  "arch.decision.cnn.a":
    "A fine-tuned CNN locks the model into a closed set of classes and demands re-training every time a new disease appears. Vector similarity over an embeddings index lets us add new reference images on the fly, return ranked similar cases, and explain results — closer to how an agronomist actually reasons.",
  "arch.decision.langgraph.q": "Why LangGraph for orchestration?",
  "arch.decision.langgraph.a":
    "Farming questions rarely fit a single tool. LangGraph models the supervisor + specialist agents as a typed state graph, with explicit routing, retries, and observability. It is production-grade where ad-hoc chains break.",
  "arch.decision.milvus.q": "Why Milvus as vector DB?",
  "arch.decision.milvus.a":
    "Milvus scales horizontally, supports hybrid (dense + sparse) search, and runs fine on a single modest VM for the pilot — then clusters when we onboard more cooperatives. Open-source and battle-tested.",
  "arch.decision.deepseek.q": "Why DeepSeek as LLM?",
  "arch.decision.deepseek.a":
    "DeepSeek delivers GPT-4-class reasoning at a fraction of the cost, with permissive licensing. Critical when you serve smallholder farmers and every query has to stay under a few cents.",
  "arch.decision.mcp.q": "Why MCP for interoperability?",
  "arch.decision.mcp.a":
    "The Model Context Protocol exposes Deep Farm's agents as standard tools. Any MCP-compatible client — mobile app, web platform, future partner integrations — talks to the same backend without bespoke glue code.",

  // Architecture page — Open source
  "arch.os.eyebrow": "Built in the open",
  "arch.os.title": "Open-source & reproducible",
  "arch.os.license.label": "License",
  "arch.os.license.value": "MIT",
  "arch.os.license.desc":
    "Fully open-source. Fork it, ship it, adapt it to your cooperative.",
  "arch.os.cost.label": "Operating cost",
  "arch.os.cost.value": "< $20 / month",
  "arch.os.cost.desc":
    "Less than $20 per month to run the full platform for 100 farms.",
  "arch.os.cta": "Browse the code on GitHub",

  // Architecture page — Final CTA
  "arch.cta.title": "Want to fork it or collaborate?",
  "arch.cta.intro":
    "Deep Farm is built with and for the agricultural community. Researchers, engineers, NGOs and cooperatives are all welcome.",
  "arch.cta.contact": "Contact us",
};

const fr: Dict = {
  // Nav
  "nav.project": "Le Projet",
  "nav.how": "Fonctionnement",
  "nav.impact": "Impact",
  "nav.iot": "IoT solaire",
  "nav.science": "Science & Tech",
  "nav.team": "Équipe",
  "nav.news": "Actualités",
  "nav.contact": "Contact",
  "nav.arch.pipeline": "Pipeline",
  "nav.arch.agents": "Les quatre agents",
  "nav.arch.decisions": "Compromis",
  "nav.arch.opensource": "Open source",
  "header.signin": "Connexion",

  // Announcement bar
  "announcement.text":
    "Deep Farm sera présenté au 1er Sommet IA de l'océan Indien — 28–29 mai 2026, Antananarivo",
  "announcement.boldFragment": "1er Sommet IA de l'océan Indien",
  "announcement.eyebrow": "À l'affiche",
  "announcement.date": "Antananarivo · 28–29 mai 2026",
  "announcement.learnMore": "En savoir plus",
  "announcement.dismiss": "Fermer l'annonce",

  // Hero
  "hero.badge": "Open-source · Erasmus+ #101128032",
  "hero.title": "L'IA au service des riziculteurs malgaches",
  "hero.subtitle":
    "Un tuteur numérique multi-agent open-source qui combine IoT solaire et IA agentique pour transformer la riziculture à Madagascar.",
  "hero.cta.discover": "Découvrir le projet",
  "hero.cta.watch": "Voir la démo",
  "hero.partners": "En partenariat avec",

  // Challenge
  "challenge.eyebrow": "Le défi",
  "challenge.title":
    "Madagascar, autrefois autosuffisante, importe désormais son riz.",
  "challenge.p1.before": "Le riz représente ",
  "challenge.p1.bold": "43 % de la valeur ajoutée agricole",
  "challenge.p1.after":
    " et se mange à chaque repas — pourtant le pays importe des centaines de milliers de tonnes chaque année pour répondre à la demande.",
  "challenge.p2.before": "Les rendements nationaux stagnent à ",
  "challenge.p2.bold": "2,8 t/ha",
  "challenge.p2.after":
    ", plus de deux fois inférieurs aux bassins asiatiques comparables (~6 t/ha), malgré un potentiel agro-climatique identique.",
  "challenge.p3.before": "Des décennies de ",
  "challenge.p3.bold": "savoirs experts de l'ANAE",
  "challenge.p3.after":
    " restent enfermées dans des rapports PDF qui n'atteignent jamais le riziculteur au moment de décider d'un traitement.",
  "challenge.quote":
    "« 30 % des pertes de riz en Afrique subsaharienne sont dues aux maladies et au stress environnemental. »",
  "challenge.quoteSource": "FAO · 2023",
  "challenge.statLabel": "Rendement national du riz",
  "challenge.imageAlt":
    "Un riziculteur malgache dans sa rizière, smartphone à la main",

  // Key Figures
  "figures.eyebrow": "En chiffres",
  "figures.title": "Un impact tangible, mesuré sur le terrain.",
  "figures.intro":
    "Résultats du pilote sur 18 parcelles à Iarinarivo lors de la saison 2025, vérifiés indépendamment selon les protocoles de l'ANAE.",

  // Solution
  "solution.eyebrow": "Notre solution",
  "solution.title":
    "Trois couches, un tuteur numérique dans la poche de chaque riziculteur.",
  "solution.iot.title": "Stations IoT solaires",
  "solution.iot.p1": "12 stations solaires autonomes",
  "solution.iot.p2": "68 jours d'autonomie batterie",
  "solution.iot.p3": "Capteurs NPK + eau + climat",
  "solution.iot.p4": "~80 € par famille",
  "solution.ai.title": "Tuteur IA agentique",
  "solution.ai.p1":
    "4 agents spécialisés (Document, Image, Séries temporelles, Météo)",
  "solution.ai.p2": "Orchestration LangGraph",
  "solution.ai.p3": "RAG sur 42 000 pages ANAE",
  "solution.ai.p4": "LLM open-source",
  "solution.app.title": "Application mobile",
  "solution.app.p1": "Photo → diagnostic en moins d'1 minute",
  "solution.app.p2": "94 % de précision",
  "solution.app.p3": "Sources citées depuis les documents locaux",
  "solution.app.p4": "Pensée hors-ligne d'abord",

  // Solar IoT
  "solar.eyebrow": "Matériel · Edge AI",
  "solar.title": "L'IoT solaire dans la rizière",
  "solar.intro":
    "Deep Farm déploie des stations IoT solaires autonomes directement dans les rizières. Chaque station collecte des données de sol et de climat toutes les quelques secondes, fonctionne hors-ligne plus de 2 mois sans soleil, et partage les données avec notre tuteur IA.",
  "solar.step.panel": "Panneau solaire",
  "solar.step.sensors": "Capteurs au champ",
  "solar.step.hub": "Hub Raspberry Pi",
  "solar.step.cloud": "Cloud",
  "solar.step.app": "App riziculteur",
  "solar.npk.name": "Capteur de sol NPK",
  "solar.npk.detail":
    "Mesure Azote, Phosphore, Potassium en temps réel via RS-485 Modbus.",
  "solar.dht.name": "Capteur climat DHT22",
  "solar.dht.detail":
    "Suit la température et l'humidité de l'air, indicateurs clés du risque maladie.",
  "solar.tl.name": "Niveau d'eau TL-136",
  "solar.tl.detail":
    "Surveille la profondeur d'irrigation avec une sonde étanche IP68 (sortie 4-20 mA).",
  "solar.hub.name": "Hub solaire",
  "solar.hub.detail":
    "Arduino Mega + ESP-01S + Raspberry Pi. Batterie solaire 12 V, 68 jours d'autonomie sans recharge.",
  "solar.cta": "En savoir plus sur notre architecture",
  "solar.imageAlt":
    "Schéma : panneau solaire alimentant des capteurs au champ reliés à une station Raspberry Pi, synchronisés avec le cloud et le smartphone du riziculteur",

  // Demo
  "demo.eyebrow": "En action",
  "demo.title":
    "D'une photo de feuille à un diagnostic sourcé en moins d'une minute.",
  "demo.step1.title": "Capturer",
  "demo.step1.body":
    "Le riziculteur photographie une feuille malade — l'app fonctionne entièrement hors-ligne.",
  "demo.step1.scan": "Toucher pour scanner une feuille",
  "demo.step2.title": "Raisonner",
  "demo.step2.body":
    "Quatre agents spécialisés collaborent via l'orchestration LangGraph.",
  "demo.step2.active": "actif",
  "demo.step3.title": "Recommander",
  "demo.step3.body":
    "Chaque recommandation s'appuie sur un document local citable.",
  "demo.step3.confidence": "Diagnostic · 94 % de confiance",
  "demo.step3.disease": "Brûlure bactérienne",
  "demo.step3.recommendation":
    "Appliquer un bactéricide à base de cuivre. Vidanger la parcelle 48 h, puis remettre en eau. Retirer les talles atteintes.",
  "demo.step3.source": "Source : ANAE 2024, p. 42",
  "demo.cta": "Essayer la démo interactive",
  "demo.agent.document": "Agent Document",
  "demo.agent.image": "Agent Image",
  "demo.agent.timeSeries": "Agent Séries temporelles",
  "demo.agent.weather": "Agent Météo",

  // Pilot Farm
  "pilot.eyebrow": "Ferme pilote",
  "pilot.title":
    "En direct de notre ferme pilote à Iarinarivo, Madagascar.",
  "pilot.body":
    "Douze stations IoT solaires diffusent les données NPK, niveau d'eau et microclimat toutes les quinze minutes — le tout alimente le même système agentique que les riziculteurs interrogent depuis leur téléphone.",
  "pilot.stat.plots": "parcelles suivies",
  "pilot.stat.surface": "surface active",
  "pilot.stat.stations": "stations solaires déployées",
  "pilot.stat.regions": "régions couvertes",
  "pilot.cta": "Explorer le projet",

  // Partners
  "partners.eyebrow": "Soutenu par des institutions de référence",
  "partners.placeholderNotice":
    "Logos provisoires — à remplacer par les visuels officiels",

  // IOAI
  "ioai.badge": "Événement à la une",
  "ioai.title": "Deep Farm au 1er Sommet IA de l'océan Indien",
  "ioai.body":
    "Rejoignez-nous les 28 et 29 mai 2026 à Antananarivo, sous le patronage du Premier ministre de Madagascar.",
  "ioai.date": "28–29 mai 2026",
  "ioai.location": "Antananarivo, Madagascar",
  "ioai.cta": "En savoir plus sur IOAI 2026",

  // Get Involved
  "getInvolved.eyebrow": "Participer",
  "getInvolved.title": "Trois façons de grandir ce projet avec nous.",
  "getInvolved.ngo.audience": "Pour les ONG & financeurs",
  "getInvolved.ngo.title": "Soutenir un déploiement régional",
  "getInvolved.ngo.desc":
    "Partenariez avec nous pour amener Deep Farm dans une nouvelle région. 80 € équipent une famille pour une saison entière.",
  "getInvolved.ngo.cta": "Nous contacter",
  "getInvolved.researcher.audience": "Pour les chercheurs",
  "getInvolved.researcher.title": "Collaborer ou forker sur GitHub",
  "getInvolved.researcher.desc":
    "Sous licence MIT. Reproduisez nos expériences, contribuez des agents ou étendez le RAG à d'autres cultures.",
  "getInvolved.researcher.cta": "Voir le dépôt",
  "getInvolved.institution.audience": "Pour les institutions",
  "getInvolved.institution.title": "Intégrer Deep Farm via MCP",
  "getInvolved.institution.desc":
    "Branchez notre tuteur agentique sur vos services de vulgarisation existants via le Model Context Protocol.",
  "getInvolved.institution.cta": "Lire la documentation",

  // Footer
  "footer.tagline":
    "Tuteur numérique multi-agent open-source pour les riziculteurs malgaches. Construit avec ESTIA, IT University, UNIVA et ANAE — financé par Erasmus+.",
  "footer.col.explore": "Explorer",
  "footer.col.resources": "Ressources",
  "footer.col.contact": "Contact",
  "footer.link.project": "Le Projet",
  "footer.link.how": "Fonctionnement",
  "footer.link.impact": "Impact",
  "footer.link.science": "Science & Tech",
  "footer.link.team": "Équipe",
  "footer.link.news": "Actualités",
  "footer.link.github": "GitHub",
  "footer.link.docs": "Documentation",
  "footer.link.research": "Publications scientifiques",
  "footer.link.press": "Kit presse",
  "footer.link.contact": "Contact",
  "footer.eu":
    "Cofinancé par l'Union européenne — projet Erasmus+ #101128032. Les opinions exprimées n'engagent toutefois que leurs auteurs et ne reflètent pas nécessairement celles de l'Union européenne.",
  "footer.legal": "Mentions légales",
  "footer.privacy": "Confidentialité",

  // Architecture page — Hero
  "arch.back": "Retour à l'accueil",
  "arch.eyebrow": "Plongée technique",
  "arch.title": "Comment fonctionne Deep Farm — Architecture",
  "arch.intro":
    "Deep Farm associe l'IoT solaire, la recherche vectorielle et un système d'IA multi-agent pour livrer des conseils de riziculture personnalisés en moins d'une minute. Voici comment les pièces s'imbriquent.",

  // Architecture page — Pipeline
  "arch.pipeline.eyebrow": "Vue d'ensemble",
  "arch.pipeline.title": "Quatre couches, un pipeline",
  "arch.layer.iot": "Couche IoT",
  "arch.layer.iot.1": "Stations solaires",
  "arch.layer.iot.2": "Arduino Mega",
  "arch.layer.iot.3": "ESP-01S Wi-Fi",
  "arch.layer.iot.4": "Hub Raspberry Pi",
  "arch.layer.backend": "Couche backend",
  "arch.layer.backend.1": "Passerelle FastAPI",
  "arch.layer.backend.2": "MongoDB time-series",
  "arch.layer.backend.3": "Vecteurs Milvus",
  "arch.layer.backend.4": "Métadonnées PostgreSQL",
  "arch.layer.ai": "Couche IA",
  "arch.layer.ai.1": "Superviseur LangGraph",
  "arch.layer.ai.2": "4 agents spécialisés",
  "arch.layer.ai.3": "LLM DeepSeek",
  "arch.layer.ai.4": "Routage d'outils & relances",
  "arch.layer.ui": "Couche interface",
  "arch.layer.ui.1": "App mobile (offline-first)",
  "arch.layer.ui.2": "Plateforme web",
  "arch.layer.ui.3": "Protocole MCP",
  "arch.layer.ui.4": "Tableaux de bord coopératives",

  // Architecture page — Agents
  "arch.agents.eyebrow": "L'équipe",
  "arch.agents.title": "Les quatre agents",
  "arch.agent.doc.name": "Agent Documents",
  "arch.agent.doc.detail":
    "RAG sur 42 000 pages ANAE via les embeddings nomic-embed-text-v1.5.",
  "arch.agent.image.name": "Agent Images",
  "arch.agent.image.detail":
    "Recherche par similarité vectorielle via nomic-embed-vision-v1.5 (94 % de précision sur les maladies du riz).",
  "arch.agent.timeseries.name": "Agent Séries temporelles",
  "arch.agent.timeseries.detail":
    "Analyse les données capteurs depuis les collections time-series MongoDB.",
  "arch.agent.weather.name": "Agent Météo",
  "arch.agent.weather.detail":
    "Se connecte à l'API OpenMeteo pour les prévisions.",

  // Architecture page — Decisions
  "arch.decisions.eyebrow": "Compromis",
  "arch.decisions.title": "Pourquoi ces choix technologiques ?",
  "arch.decision.cnn.q":
    "Pourquoi la recherche vectorielle plutôt qu'une classification CNN ?",
  "arch.decision.cnn.a":
    "Un CNN finetuné enferme le modèle dans un ensemble fermé de classes et impose un ré-entraînement à chaque nouvelle maladie. La similarité vectorielle sur un index d'embeddings nous permet d'ajouter de nouvelles images de référence à la volée, de retourner des cas similaires classés et d'expliquer les résultats — plus proche de la façon dont un agronome raisonne.",
  "arch.decision.langgraph.q": "Pourquoi LangGraph pour l'orchestration ?",
  "arch.decision.langgraph.a":
    "Les questions agricoles entrent rarement dans le moule d'un seul outil. LangGraph modélise le superviseur + les agents spécialisés comme un graphe d'état typé, avec routage explicite, relances et observabilité. C'est de niveau production là où les chaînes ad-hoc cassent.",
  "arch.decision.milvus.q": "Pourquoi Milvus comme base vectorielle ?",
  "arch.decision.milvus.a":
    "Milvus passe à l'échelle horizontalement, supporte la recherche hybride (dense + sparse) et tourne très bien sur une simple VM modeste pour le pilote — puis se cluster quand on intègre plus de coopératives. Open-source et éprouvé.",
  "arch.decision.deepseek.q": "Pourquoi DeepSeek comme LLM ?",
  "arch.decision.deepseek.a":
    "DeepSeek offre un raisonnement de niveau GPT-4 à une fraction du coût, avec une licence permissive. Critique quand on sert des petits exploitants et que chaque requête doit rester sous quelques centimes.",
  "arch.decision.mcp.q": "Pourquoi MCP pour l'interopérabilité ?",
  "arch.decision.mcp.a":
    "Le Model Context Protocol expose les agents Deep Farm comme des outils standards. N'importe quel client compatible MCP — app mobile, plateforme web, futures intégrations partenaires — parle au même backend sans glue spécifique.",

  // Architecture page — Open source
  "arch.os.eyebrow": "Construit ouvertement",
  "arch.os.title": "Open-source & reproductible",
  "arch.os.license.label": "Licence",
  "arch.os.license.value": "MIT",
  "arch.os.license.desc":
    "Entièrement open-source. Forke, déploie, adapte-le à ta coopérative.",
  "arch.os.cost.label": "Coût d'exploitation",
  "arch.os.cost.value": "< 20 $ / mois",
  "arch.os.cost.desc":
    "Moins de 20 $ par mois pour faire tourner toute la plateforme pour 100 fermes.",
  "arch.os.cta": "Voir le code sur GitHub",

  // Architecture page — Final CTA
  "arch.cta.title": "Envie de forker ou de collaborer ?",
  "arch.cta.intro":
    "Deep Farm est construit avec et pour la communauté agricole. Chercheurs, ingénieurs, ONG et coopératives sont les bienvenus.",
  "arch.cta.contact": "Nous contacter",
};

const DICTS: Record<Locale, Dict> = { en, fr };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
});

function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "fr") return stored;
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("fr") ? "fr" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const t = (key: string) => DICTS[locale][key] ?? DICTS.en[key] ?? key;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
