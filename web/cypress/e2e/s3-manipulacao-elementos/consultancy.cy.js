describe('login spec', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');
        cy.goTo('Formulários', 'Consultoria');

        // CAMPO DE TEXTO
        cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito');

        // CAMPO DE EMAIL
        cy.get('input[placeholder="Digite seu email"]').type('papito@webdojo.com');

        // CAMPO DE TELEFONE
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('11 999999999')
            .should('have.value', '(11) 99999-9999');

        // CAIXA DE SELEÇÃO
        // Abordagem xPath: //label[text()="Tipo de Consultoria"]/..//select
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        // CAMPO DE RADIO
        // Abordagem xPath: //span[text()="Pessoa Física"]/..//input
        // Abordagem 1: .parent()
        // cy.contains('span', 'Pessoa Física')
        //     .parent() 
        //     .find('input') 
        //     .check()
        //     .should('be.checked');

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked');

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked');

        // CAMPO DE CPF
        // Abordagem 1: placeholder
        // cy.get('input[placeholder="000.000.000-00"]')
        //     .type('96633173458')
        //     .should('have.value', '966.331.734-58');

        // Abordagem 2: mais orientado a comportamento
        // Abordagem xPath: //label[text()="CPF"]/..//input
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('96633173458')
            .should('have.value', '966.331.734-58');

        // CAMPO DE CHECKBOX
        // Abordagem xPath: //label[text()="Como você nos conheceu?"]/..//input
        const discoveryChannels = [
            'Instagram',
            // 'LinkedIn',
            'Udemy',
            // 'YouTube',
            'Indicação de Amigo'
        ]

        // Abordagem 1:
        // discoveryChannels.forEach(channel => {
        //     cy.contains('span', channel)
        //         .parent()
        //         .find('input')
        //         .check()
        //         .should('be.checked');
        // });

        // Abordagem 2:
        cy.selectCheckboxes(discoveryChannels);

        // UPLOAD DE ARQUIVOS
        // https://lorempdf.com/
        // manual test: document.querySelector(locator).value
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/pdf-cypress.pdf', { force: true })

        // CAMPO DE AREA DE TEXTO
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('a');
        // .type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

        // CAMPO DE TAGS
        const techs = [
            'Cypress',
            'Selenium',
            'Playwright',
            'WebdriverIO',
            'TestCafe',
            'Puppeteer',
            'Robot Framework',
        ]

        // Abordagem 1:
        // techs.forEach(tech => {
        //     cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        //         .type(tech)
        //         .type('{enter}')

        //     cy.contains('label', 'Tecnologias')
        //         .parent()
        //         .find('span')
        //         .should('contain.text', tech);
        // })

        // Abordagem 2:
        cy.addTechs(techs);

        // CHECKBOX DE ACEITE
        cy.contains('span', 'Li e aceito os')
            .parent()
            .find('input')
            .check()
            .should('be.checked');

        // BOTÃO DE ENVIAR
        cy.contains('button', 'Enviar formulário')
            .should('be.visible')
            .click();
        
        // MENSAGEM DE SUCESSO
        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })
});