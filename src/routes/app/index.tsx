import { createFileRoute, redirect } from "@tanstack/react-router";

// `/app` has no landing page of its own yet: the chat is the entry point of the
// workspace. When a dashboard lands, point this at it instead.
export const Route = createFileRoute("/app/")({
  beforeLoad: () => {
    throw redirect({ to: "/app/chat", replace: true });
  },
});
