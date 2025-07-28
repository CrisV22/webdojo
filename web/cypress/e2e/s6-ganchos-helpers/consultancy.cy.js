// Explicações estão contidas na pasta web/cypress/s3
describe('Formulário consulta', () => {
    before(() => {
        // Limpeza do banco de dados
    })

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {
        // CAMPO DE TEXTO
        cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')

        // CAMPO DE EMAIL
        cy.get('input[placeholder="Digite seu email"]').type('papito@webdojo.com')

        // CAMPO DE TELEFONE
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('11 999999999')
            .should('have.value', '(11) 99999-9999')

        // CAIXA DE SELEÇÃO
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        // CAMPO DE RADIO
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        // CAMPO DE CPF
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('96633173458')
            .should('have.value', '966.331.734-58')

        // CAMPO DE CHECKBOX
        const discoveryChannels = [
            'Instagram',
            // 'LinkedIn',
            'Udemy',
            // 'YouTube',
            'Indicação de Amigo'
        ]

        cy.selectCheckboxes(discoveryChannels)

        // UPLOAD DE ARQUIVOS
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/pdf-cypress.pdf', { force: true })

        // CAMPO DE AREA DE TEXTO
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('a')

        // CAMPO DE TAGS
        const techs = [
            'Cypress',
            'Selenium',
            'Playwright',
            'WebdriverIO',
            'TestCafe',
            'Puppeteer',
            'Robot Framework',
        ]

        cy.addTechs(techs)

        // CHECKBOX DE ACEITE
        cy.contains('span', 'Li e aceito os')
            .parent()
            .find('input')
            .check()
            .should('be.checked')

        // BOTÃO DE ENVIAR
        cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click()

        // MENSAGEM DE SUCESSO
        // Explicação em web/cypress/s4
        cy.get('.modal-content', { timeout: 7000, retries: 50 })
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve solicitar consultoria sem campos obrigatórios preenchidos', () => {
        cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click()

        cy.checkRequiredFields('label', 'Nome Completo', 'p', 'Campo obrigatório')
        cy.checkRequiredFields('label', 'Email', 'p', 'Campo obrigatório')
        cy.checkRequiredFields('label', 'termos de uso', 'p', 'Você precisa aceitar os termos de uso')
    })

    after(() => {
        // registro de logs
    })
})