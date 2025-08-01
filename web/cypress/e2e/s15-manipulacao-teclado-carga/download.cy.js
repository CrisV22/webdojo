describe('Download PDF', () => {
    it.only('Deve baixar um arquivo PDF com chama da API', () => {
        cy.request({
            url: 'https://lorempdf.com/140/85/1',
            encoding: 'binary'
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.writeFile('cypress/downloads/recibo.pdf', response.body, 'binary')
            })
    })

    it('Deve baixar um arquivo PDF sem chama a API', () => {})
    it('Deve ler um arquivo PDF', () => {})
})