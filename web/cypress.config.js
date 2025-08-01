const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultBrowser: 'chrome',
    video: false,
    baseUrl: 'http://localhost:3000/'
  },
});
