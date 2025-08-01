describe('GitHub', () => {
    before(() => {
        // Limpeza do banco de dados
    })

    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    // O sistema realmente tem um bug aqui.
    it('Deve validar a mensagem alerta', () => {
        // Alerts são componentes do navegador
        // Alerts não são HTML, ou seja, não dá para utilizar localizadores

        // Criando um ouvinte
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return true // simula o click no botão OK
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return false // simula o click no botão Cancelar
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        // Sempre contém um único campo.

        cy.window().then((win) => {
            // (win) dá acesso a janela do prompt alert
            // stub simula o comportamento do prompt
            cy.stub(win, 'prompt').returns('Cristian')
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Cristian! Boas vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })

    after(() => {
        // registro de logs
    })
});