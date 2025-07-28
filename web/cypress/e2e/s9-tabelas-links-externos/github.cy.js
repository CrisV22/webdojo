describe('GitHub', () => {
    before(() => {
        // Limpeza do banco de dados
    })

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve cadastrar perfil GitHub', () => {
        // Explicação em s9
        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('papito123')
        cy.get('#profile').type('QA')
        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('papitodev')
        cy.get('#profile').type('QA')
        cy.contains('button', 'Adicionar Perfil').click()

        // Abordagem 4: as + @ + td | reutilizavel
        // Resiliente a novas colunas
        cy.contains('table tbody tr', 'papitodev')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Fernando Papito')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')

        // Abordagem 3: as + @ | reutilizavel
        // cy.contains('table tbody tr', 'papitodev')
        //     .should('be.visible')
        //     .as('trProfile')

        // cy.get('@trProfile')
        //     .contains('Fernando Papito')
        //     .should('be.visible')

        // cy.get('@trProfile')
        //     .contains('QA')
        //     .should('be.visible')

        // Estrategia para validar os dados da linha desejada
        // Abordagem 2:
        // cy.contains('table tbody tr', 'papitodev')
        //     .should('be.visible')
        //     .contains('Fernando Papito')
        //     .should('be.visible')

        // cy.contains('table tbody tr', 'papitodev')
        //     .should('be.visible')
        //     .contains('QA')
        //     .should('be.visible')


        // Abordagem 1: oassivel de erro
        // cy.contains('table tbody tr', 'Fernando Papito').should('be.visible')
        // cy.contains('table tbody tr', 'papitodev').should('be.visible')
        // cy.contains('table tbody tr', 'QA').should('be.visible')
    })

    it('Deve poder remover um perfil do GitHub', () => {
        const profile = {
            name: 'Fernando Papito',
            username: 'papito123',
            profile: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('button[title="Remover perfil"]')
            .click()

        cy.contains('table tbody', profile.username)
            .should('not.exist')
    })

    it('Deve validar o link do GitHub', () => {
        const profile = {
            name: 'Fernando Papito',
            username: 'papitodev',
            profile: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('a')
            .should('have.attr', 'target', '_blank') // Verifica se o link abre em nova guia/janela
            .and('have.attr', 'href', 'https://github.com/' + profile.username) // Verifica se o link é o correto
    })

    after(() => {
        // registro de logs
    })
});