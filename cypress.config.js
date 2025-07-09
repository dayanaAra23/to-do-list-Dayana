const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      feUrl: 'http://localhost:5173',
      beUrl: 'http://localhost:3000'
    },
  },
});