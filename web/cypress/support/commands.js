// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('start', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
})

Cypress.Commands.add('submitLoginForm', (email, password) => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.contains('button', 'Entrar').click();
});

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    // Botão só com css de estilo contornado com .contains (alternativo ao Xpath) com o nome do botão para orientação do teste a comportamento.

    // Abordagem 1: .parent() para subir na hierarquia do DOM
    // análogo no XPath: //button[text()="Formulários"]/../../..
    // cy.contains('h4', 'Formulários')
    // .parent()
    // .parent()
    // .parent()
    // .should('be.visible')

    // Abordagem 2: .contains() também inspeciona os filhos permitindo ir do button até o elemento mais baixo na hierarquia do DOM para encontrar o texto Formulários
    cy.contains('button', buttonName)
        .should('be.visible')
        .click();

    cy.contains('h1', pageTitle)
        .should('be.visible');
});

Cypress.Commands.add('selectCheckboxes', (list) => {
    list.forEach(item => {
        cy.contains('span', item)
            .parent()
            .find('input')
            .check()
            .should('be.checked');
    });
});

Cypress.Commands.add('addTechs', (techs) => {
    techs.forEach(tech => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .find('span')
            .should('contain.text', tech);
    });
});