import type { StateStorage } from "zustand/middleware";

/** Storage failures must not interrupt cart interactions (e.g. restricted mobile browsers). */
export function createBrowserStorage(): StateStorage {
  const memory = new Map<string, string | null>();
  const fallbackKey = (name: string) => `${name}:fallback`;

  return {
    getItem(name) {
      if (typeof window === "undefined") return null;
      if (memory.has(name)) return memory.get(name) ?? null;
      let fallback: string | null = null;
      try {
        fallback = window.sessionStorage.getItem(fallbackKey(name));
      } catch {
        // Some browsers restrict session storage as well as local storage.
      }
      let local: string | null = null;
      try {
        local = window.localStorage.getItem(name);
      } catch {
        // Continue with the session or in-memory copy.
      }
      for (const value of [fallback, local]) {
        if (value === null) continue;
        try {
          JSON.parse(value);
          memory.set(name, value);
          return value;
        } catch {
          // An invalid saved JSON value must not prevent store hydration.
        }
      }
      return null;
    },
    setItem(name, value) {
      if (typeof window === "undefined") return;
      memory.set(name, value);
      try {
        window.localStorage.setItem(name, value);
      } catch {
        try {
          window.sessionStorage.setItem(fallbackKey(name), value);
        } catch {
          // Keep the cart usable in memory when browser storage is unavailable.
        }
        return;
      }
      try {
        window.sessionStorage.removeItem(fallbackKey(name));
      } catch {
        // The local copy was saved successfully.
      }
    },
    removeItem(name) {
      if (typeof window === "undefined") return;
      memory.set(name, null);
      try {
        window.localStorage.removeItem(name);
      } catch {
        // Removal in memory still takes effect for this page session.
      }
      try {
        window.sessionStorage.removeItem(fallbackKey(name));
      } catch {
        // Session storage can be disabled independently.
      }
    },
  };
}
