const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

/**
 * Resolve the browser's Wisp WebSocket endpoint.
 *
 * The DOGEUB Node server already handles /wisp/ on the same host as the app.
 * Defaulting production clients to the retired Railway URL sent traffic to an
 * unrelated/offline service even when DOGEUB was running its own Node server.
 *
 * Static hosts such as Vercel do not provide the persistent WebSocket upgrade
 * handler required by Wisp. Those deployments need a separately hosted Wisp
 * endpoint configured with VITE_WISP_SERVER; a same-origin default cannot
 * create a backend that the host does not provide.
 */
export function resolveWispServer(configuredServer) {
  const localDefault =
    (location.protocol === "https:" ? "wss:" : "ws:") + "//" + location.host + "/wisp/";
  const savedServer = String(configuredServer || "").trim();

  if (!savedServer) return localDefault;

  try {
    const candidate = new URL(savedServer, location.href);
    if (candidate.protocol !== "ws:" && candidate.protocol !== "wss:") {
      return localDefault;
    }

    // Older settings may contain the retired Railway endpoint. Migrate only
    // that known legacy value; keep explicitly configured custom endpoints.
    if (candidate.hostname === "studylive.up.railway.app" &&
        candidate.pathname.replace(/\/+$/, "") === "/wisp") {
      return localDefault;
    }

    // A same-origin /wisp/ URL is canonical, including on production Node
    // deployments. Preserve other explicit WebSocket endpoints.
    if (candidate.host === location.host &&
        candidate.pathname.replace(/\/+$/, "") === "/wisp") {
      return localDefault;
    }

    return candidate.href;
  } catch {
    return localDefault;
  }
}
