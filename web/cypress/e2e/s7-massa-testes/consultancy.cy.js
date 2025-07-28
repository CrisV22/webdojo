// Melhor abordagem para importar dados. 
// Também poderiamos desestruturar a massa de testes
import { personal, company } from '../../fixtures/consultancy.json'

// Abordagem 2: import
// import consultancyData from '../../fixtures/consultancy.json'

// Abordagem 1: cy.fixture
// Utilizar cy.fixture gera:
// Despadronização com () => indo para function(). Utilize em casos específicos

// Explicações estão contidas na pasta web/cypress/s3
describe('Formulário consulta', () => {
    before(() => {
        // Limpeza do banco de dados
    })

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
        // cy.fixture('consultancy').as('consultancyData')
    })

    it('Deve solicitar consultoria individual', () => {
        // Mudança () => para function() para possibilitar a importação dos dados
        // Massa passou de 5 itens, coloque no fixtures.
        // const consultancyForm = consultancyData.personal // Utilizado na abordagem 2

        // CAMPO DE TEXTO
        cy.get('input[placeholder="Digite seu nome completo"]').type(personal.name)

        // CAMPO DE EMAIL
        cy.get('input[placeholder="Digite seu email"]').type(personal.email)

        // CAMPO DE TELEFONE
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(personal.phone)
        // .should('have.value', '(11) 99999-9999')

        // CAIXA DE SELEÇÃO
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(personal.consultancyType)

        // CAMPO DE RADIO
        if (personal.personType === 'CPF') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (personal.personType === 'CNPJ') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        // CAMPO DE CPF
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(personal.document)
        // .should('have.value', '966.331.734-58')

        // CAMPO DE CHECKBOX
        cy.selectCheckboxes(personal.discoveryChannels)

        // UPLOAD DE ARQUIVOS
        cy.get('input[type="file"]')
            .selectFile(personal.file, { force: true })

        // CAMPO DE AREA DE TEXTO
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(personal.description)

        // CAMPO DE TAGS
        cy.addTechs(personal.techs)

        // CHECKBOX DE ACEITE
        if (personal.terms === true) {
            cy.contains('span', 'Li e aceito os')
                .parent()
                .find('input')
                .check()
                .should('be.checked')
        }

        // BOTÃO DE ENVIAR
        cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click()

        // MENSAGEM DE SUCESSO
        // Explicação em web/cypress/s4
        cy.get('.modal-content', { timeout: 7000, retries: 50 })
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve solicitar consultoria in company', function () {
        // const consultancyForm = consultancyData.company  // Utilizado na abordagem 2

        // CAMPO DE TEXTO
        cy.get('input[placeholder="Digite seu nome completo"]').type(company.name)

        // CAMPO DE EMAIL
        cy.get('input[placeholder="Digite seu email"]').type(company.email)

        // CAMPO DE TELEFONE
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(company.phone)
        // .should('have.value', '(11) 99999-9999')

        // CAIXA DE SELEÇÃO
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(company.consultancyType)

        // CAMPO DE RADIO
        if (company.personType === 'CPF') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (company.personType === 'CNPJ') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        // CAMPO DE CPF
        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(company.document)
        // .should('have.value', '966.331.734-58')

        // CAMPO DE CHECKBOX
        cy.selectCheckboxes(company.discoveryChannels)

        // UPLOAD DE ARQUIVOS
        cy.get('input[type="file"]')
            .selectFile(company.file, { force: true })

        // CAMPO DE AREA DE TEXTO
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(company.description)

        // CAMPO DE TAGS
        cy.addTechs(company.techs)

        // CHECKBOX DE ACEITE
        if (company.terms === true) {
            cy.contains('span', 'Li e aceito os')
                .parent()
                .find('input')
                .check()
                .should('be.checked')
        }

        // BOTÃO DE ENVIAR
        cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click()

        // MENSAGEM DE SUCESSO
        // Explicação em web/cypress/s4
        cy.get('.modal-content', { timeout: 7000, retries: 50 })
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve solicitar consultoria sem campos obrigatórios preenchidos', () => {
        cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click()

        cy.checkRequiredFields('label', 'Nome Completo', 'p', 'Campo obrigatório')
        cy.checkRequiredFields('label', 'Email', 'p', 'Campo obrigatório')
        cy.checkRequiredFields('label', 'termos de uso', 'p', 'Você precisa aceitar os termos de uso')
    })

    after(() => {
        // registro de logs
    })
})