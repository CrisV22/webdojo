describe('login spec', () => {
    it('Deve logar com sucesso', () => {
        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');

        cy.get('[data-cy="user-name"]')
            .should('be.visible')
            .and('have.text', 'Fernando Papito');
        
        cy.get('[data-cy="welcome-message"]')
            .should('be.visible')
            .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.');
    })

    it('Não deve logar com senha inválida', () => {
        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');

        cy.contains('Acesso negado! Tente novamente')
            .should('be.visible');
    })

    it('Não deve logar com email não cadastrado', () => {
        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');

        cy.contains('Acesso negado! Tente novamente')
            .should('be.visible');
    })
});