import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Teste de Carga', () => {
    beforeEach(() => {
        cy.start()
        cy.goToSignup()
    })

    _.times(20, () => {
        it('Deve ser resiliente com carga', () => {
            // executa um loop por um tempo X




            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            cy.get('#name').type(name)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.contains('button', 'Criar conta').click()

            cy.contains('Conta criada com sucesso!')
                .should('be.visible')
        })
    })
})