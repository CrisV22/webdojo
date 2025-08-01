describe('iFrame', () => {
    it('Deve tocar o video de exemplo', () => {
        cy.login()
        cy.goTo('Video', 'Video')

        // Não é possível clicar no botão de play diretamente, pois o Cypress não suporta interações com iFrames.
        // cy.get('.play-button')

        // Então, precisamos acessar o conteúdo do iFrame e clicar no botão de play dentro dele
        // iFrame é um elemento HTML que permite incorporar outro documento HTML dentro de um documento HTML.

        // Uso estratégia thinking time para lidar com flakiness porque o Cypress tem suporte limitado para iFrame
        cy.wait(3000)
        
        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
                // 0 - pega o primeiro iFrame na lista de iFrames
                // .contentDocument - acessa o documento do iFrame
                // .body - acessa o corpo do documento do iFrame
            .then(cy.wrap)
                // Pega valor de um objeto, array ou elemento da página e transforma em objeto Cypress para utilizar os comandos do Cypress nele.
            .as('iFramePlayer') // Atribui o iFrame a uma variável para reutilizar
        
        cy.get('@iFramePlayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')

    })
})
