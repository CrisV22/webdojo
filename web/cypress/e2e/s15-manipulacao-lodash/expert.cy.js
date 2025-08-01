import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {
    beforeEach(() => {
        cy.start()
    })

    // Muito útil para testar envio de formulário com campos não editáveis contendo algum valor
    it('Deve manipular os atributos de elementos HTML', () => {
        // value
        cy.get('#email').invoke('val', 'adicionado com invoke')

        //
        cy.get('#password').invoke('attr', 'type', 'text').type('adicionado com invoke')
        cy.get('#password').invoke('removeAttr', 'class').type('adicionado com invoke')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')
    })

    // TOAST
    it('Não deve logar com senha inválida', () => {
        cy.submitLoginForm('papito@webdojo.com', 'senha-invalida');

        // OBTENDO DOC HTML COM O TOAST
        // cy.wait(2500)

        // cy.document().then((doc) => {
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        // })

        // Abordagem 3: 
        cy.get('[data-sonner-toaster=true]')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')
            .should('be.visible')

        // Abordagem 2: 
        // cy.get('[data-sonner-toaster=true] div[class="title"]')
        // .should('have.text', 'Acesso negado! Tente novamente.')
        // .should('be.visible')

        // Abordagem 1: menor recomendada
        // cy.contains('Acesso negado! Tente novamente').should('be.visible');

        cy.wait(5000)
        cy.get('[data-sonner-toaster=true]')
            .should('not.exist')
    })

    // TECLAS
    it('Simulando a tecla tab com .press()', () => {
        // body = corpo do documento
        cy.get('body').press('Tab')
        // Verificando se o campo correto está com foco
        cy.focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
        cy.focused().should('have.attr', 'id', 'password')
    })

    // TECLAS
    it('Submissão com tecla Enter', () => {
        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('katana123{Enter}')
        cy.contains('h1', 'Dashboard').should('be.visible')

        // OUTRAS TECLAS
        // ESC - {Escape}
    })

    // TESTE DE CARGA
    it.only('Deve realizar uma carga de dados fakes', () => {

        // executa um loop por um tempo X
        _.times(100, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            cy.log(name)
            cy.log(email)
            cy.log(password)
        })

    })
})