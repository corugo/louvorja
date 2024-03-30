if (typeof process === "undefined") {
  const process = {
    env: {
      HOME: "",
      APPDATA: "",
    },
    platform: "",
    versions: {},
  };
}

/**
 * Local APPDATA folder (platform dependent).
 * @type {string}
 */
export const APPDATA =
  typeof process !== "undefined"
    ? process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share")
    : null;

/**
 * @see https://stackoverflow.com/questions/61725325/detect-an-electron-instance-via-javascript
 * @returns {boolean} If is running on electron.
 */
export function isElectron() {
  // Renderer process
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true;
  }

  return false;
}
