describe('Simulando Mouseover', () => {
    it('Deve mostrar o texto ao passar o mouse em cima do link do instagram', () => {
        cy.login()
        
        cy.contains('Isso é Mouseover!').should('not.exist') // Garantindo que o elemento não está no DOM
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist') // Garantindo que o elemento está no DOM
    })
})
