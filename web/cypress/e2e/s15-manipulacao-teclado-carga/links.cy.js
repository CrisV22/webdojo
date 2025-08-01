describe('Simulando Mouseover', () => {
    before(() => {
        // Limpeza do banco de dados
    })

    beforeEach(() => {
        cy.login()
    })

    it('Deve mostrar o texto ao passar o mouse em cima do link do instagram', () => {
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'target', '_blank') // Verifica se o link abre em nova guia/janela
            .and('have.attr', 'href', 'https://www.instagram.com/qapapito') // Verifica se o link é o correto
    })

    it('Acessa link de termos de uso removendo o target blank', () => {
        cy.goTo('Formulários', 'Consultoria')

        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target') // Remove o target _blank para abrir na mesma guia
            .click()

        cy.contains('h1', 'Termos de Uso')
            .should('be.visible')
            .and('have.text', 'Termos de Uso')
    })

    after(() => {
        // registro de logs
    })
})
