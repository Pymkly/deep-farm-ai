import { createFileRoute, redirect } from "@tanstack/react-router";

// The account page now lives inside the back office, under the sidebar shell.
// Kept as a redirect so existing links and bookmarks to /account still land.
export const Route = createFileRoute("/account")({
  beforeLoad: () => {
    throw redirect({ to: "/app/account", replace: true });
  },
});
