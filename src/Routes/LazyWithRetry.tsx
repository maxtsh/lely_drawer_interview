import { lazy } from "react";

type ComponentImportType = () => Promise<{ default: React.ComponentType }>;

const sessionKey = "lwr";

const lazyWithRetry = (componentImport: ComponentImportType) => {
  return lazy(async () => {
    const hasRefreshed = globalThis.sessionStorage.getItem(sessionKey) || "no";

    try {
      globalThis.sessionStorage.setItem(sessionKey, "no");
      return await componentImport();
    } catch (error) {
      if (hasRefreshed === "no") {
        globalThis.sessionStorage.setItem(sessionKey, "yes");
        globalThis.location.reload();
      }

      if (hasRefreshed === "yes") throw new Error("chunkError");
    }
    return componentImport();
  });
};

export default lazyWithRetry;
