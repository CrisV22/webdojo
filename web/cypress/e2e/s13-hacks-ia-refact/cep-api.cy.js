import address from "./fixtures/cep.json"

describe('CEP', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('Deve validar a consulta de CEP', () => {
        // E se a API dos correios parar de funcionar? Ficamos com o teste travando? 
        // Mantemos essa dependência de um sistema que não temos controle?
        // Resolvemos essa incerteza e risco utilizando mocks
        // Também pode resolver problemas de instabilidade no ambiente interno da aplicação ou uma API que está em manutenção mas precisamos que os testes sejam realizados.

        // Interpolação de string
        cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, {
            statusCode: 200,
            // Modelagem da esquerda deve segue a lógica do viacep
            // Modelagem da direita deve seguir a lógica da aplicação
            body: {
                logradouro: address.street,
                bairro: address.neighborhood,
                localidade: address.city,
                uf: address.state
            }
        }).as('getCep')

        cy.get('#cep').type(address.cep)
            .should('have.value', '04534-011')

        cy.contains('button', 'Buscar').click()

        // Aguardando interceptação
        cy.wait('@getCep')

        cy.get('#street').should('have.value', address.street)
        cy.get('#neighborhood').should('have.value', address.neighborhood)
        cy.get('#city').should('have.value', address.city)
        cy.get('#state').should('have.value', address.state)
    });

    it('Deve informar CEP não encontrado', () => {
        // Ouvinte
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('CEP não encontrado')
        })

        cy.get('#cep').type('11111111')
        cy.contains('button', 'Buscar').click()
    })
})