Cypress.Commands.add('fillConsultancyForm', (form) => {
    // CAMPO DE TEXTO
    cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)

    // CAMPO DE EMAIL
    cy.get('input[placeholder="Digite seu email"]').type(form.email)

    // CAMPO DE TELEFONE
    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
    // .should('have.value', '(11) 99999-9999')

    // CAIXA DE SELEÇÃO
    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)

    // CAMPO DE RADIO
    if (form.personType === 'CPF') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')
    }

    if (form.personType === 'CNPJ') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')
    }

    // CAMPO DE CPF
    cy.contains('label', form.personType)
        .parent()
        .find('input')
        .type(form.document)
    // .should('have.value', '966.331.734-58')

    // CAMPO DE CHECKBOX
    cy.selectCheckboxes(form.discoveryChannels)

    // UPLOAD DE ARQUIVOS
    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    // CAMPO DE AREA DE TEXTO
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)

    // CAMPO DE TAGS
    cy.addTechs(form.techs)

    // CHECKBOX DE ACEITE
    if (form.terms === true) {
        cy.contains('span', 'Li e aceito os')
            .parent()
            .find('input')
            .check()
            .should('be.checked')
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
        // BOTÃO DE ENVIAR
        cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
        // MENSAGEM DE SUCESSO
        // Explicação em web/cypress/s4
        cy.get('.modal-content', { timeout: 7000, retries: 50 })
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})