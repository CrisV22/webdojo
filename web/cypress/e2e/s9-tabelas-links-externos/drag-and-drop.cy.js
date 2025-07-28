describe('Drag and Drop', () => {
    it('Deve mover uma tarefa de Todo para Done e atualizar o board', () => {
        cy.login()
        cy.goTo('Kanban', 'Kanban Board')

        // Recurso JavaaScript para transfirir um elemento no DOM para outro lugar na hierarquia
        const dataTransfer = new DataTransfer()

        // Simula o click e o arraste
        cy.contains('div[draggable="true"]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })

        // Solta o elemento na nova posição
        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)') // Verifica contador
        
        cy.get('.column-done')
        // Não funciona porque div não tem texto
        // .should('have.text', 'Documentar API')

        // Como o filho tem texto, usamos o include.text
        .should('include.text', 'Documentar API')
        .and('include.text', 'Criar documentação da API com Swagger')
    })
})
