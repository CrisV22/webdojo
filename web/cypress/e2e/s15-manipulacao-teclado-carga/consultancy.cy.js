// Explica massa de dados na pasta s7-massa-dados
import { personal, company, requiredFields } from './fixtures/consultancy.json'

// Criado commands para otimização do código.
describe('Formulário consulta', () => {
    before(() => {
        // Limpeza do banco de dados
    })

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {
        cy.fillConsultancyForm(personal)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()
    })

    it('Deve solicitar consultoria in company', function () {
        cy.fillConsultancyForm(company)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()
    })

    it('Deve solicitar consultoria sem campos obrigatórios preenchidos', () => {
        cy.submitConsultancyForm()
        // Melhor abordagem para lidar com campos obrigatórios
        // Facil de escalar mais campos obrigatórios
        cy.checkRequiredFields(requiredFields)
    })

    after(() => {
        // registro de logs
    })
})