const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "npac3t",
  video: false,
  defaultCommandTimeout: 2000,
  viewportWidth: 1200,
  blockHosts: [
    "*google-analytics.com",
    "*hotjar.com",
    "*ugent.containers.piwik.pro",
  ],
  env: {
    widgetsBaseUrl: "http://widgets.lib.ugent.be",
  },
  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://lib.ugent.be",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
