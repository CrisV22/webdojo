describe('login spec', () => {
    function getTodayDate() {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

    before(() => {
        // Limpeza do banco de dados
    })

    beforeEach(() => {
        cy.start()
    })

    it('Deve logar com sucesso', () => {
        cy.submitLoginForm('papito@webdojo.com', 'katana123');

        cy.get('[data-cy="user-name"]')
            .should('be.visible')
            .and('have.text', 'Fernando Papito');

        cy.get('[data-cy="welcome-message"]')
            .should('be.visible')
            .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.');

        // Cookies
        cy.getCookie('login_date').should('exist')
        cy.getCookie('login_date').should((cookie) => {
            expect(cookie.value).to.eq(getTodayDate())
        })

        // Local Storage
        // .window() - acesso aos recursos do navegador em tempo de execução
        cy.window().then((win) => {
            // Pega o token
            const token = win.localStorage.getItem('token')
            // Verifica se existe
            expect(token).to.exist

            // Teste manual com https://playcode.io/javascript
            // Abordagem 2: valida formatação
            // Alinhando com o DEV a lógica de criptografia é possivel valida-la também.
            expect(token).to.match(/^[a-fA-F0-9]{32}$/)

            // Abordagem 1:
            // expect(isValidMD5(token)).to.equal(true)
        })
    })

    it('Não deve logar com senha inválida', () => {
        cy.submitLoginForm('papito@webdojo.com', 'senha-invalida');

        cy.contains('Acesso negado! Tente novamente')
            .should('be.visible');
    })

    it('Não deve logar com email não cadastrado', () => {
        cy.submitLoginForm('a@a.com', 'katana123');

        cy.contains('Acesso negado! Tente novamente')
            .should('be.visible');
    })

    after(() => {
        // registro de logs
    })
});