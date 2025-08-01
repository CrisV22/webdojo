const { defineConfig } = require("cypress");

const {deleteUserByEmail} = require('./cypress/support/database')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Task para deletar cadastro de dado de chave única
      on('task', {
        deleteUser(email) {
          return deleteUserByEmail(email)
        }
      })
    },
    baseUrl: 'http://localhost:3333'
  },
});
