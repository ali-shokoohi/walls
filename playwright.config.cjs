const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/browser",
  timeout: 30000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:1414",
    browserName: "chromium",
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
    reducedMotion: "reduce",
  },
  webServer: {
    command:
      "hugo server --bind 127.0.0.1 --port 1414 --disableLiveReload --noHTTPCache",
    url: "http://127.0.0.1:1414",
    reuseExistingServer: false,
    timeout: 30000,
  },
});
