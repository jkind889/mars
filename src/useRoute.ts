import { useSyncExternalStore } from "react";

// Hash URLs work on static hosts without server rewrite rules. Native anchors
// retain open-in-new-tab, browser history, and direct-link behavior.
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export function useRoute() {
  return useSyncExternalStore(subscribe, () => window.location.hash, () => "");
}
