describe('Signup', () => {
    beforeEach(() => {
        cy.start()
        cy.goToSignup()
    })

    it('Deve cadastrar um usuário', () => {
        const user = {
            name: 'Cristian Oliveira',
            email: 'cris@cadastro.com',
            password: 'pwd123'
        }

        cy.intercept('POST', 'http://localhost:3333/api/users/register', {
            statusCode: 201,
            body: {
                message: 'Conta criada com sucesso!'
            }
        }).as('postSignup')

        cy.get('#name').type(user.name)
        cy.get('#email').type(user.email)
        cy.get('#password').type(user.password)
        cy.contains('button', 'Criar conta').click()

        cy.wait('@postSignup')

        cy.contains('Conta criada com sucesso!')
        .should('be.visible')
    })

    it('Não deve cadastrar usuário sem campos obrigatórios', () => {
        const requiredFields = [
            { label: "Nome", message: "Opa! Precisamos do seu nome para continuar. 😃" },
            { label: "E-mail", message: "Ei! Parece que você esqueceu de digitar seu email. 📩" },
            { label: "Senha", message: "Crie uma senha para continuar. 🔐" },
        ]

        cy.contains('button', 'Criar conta').click()

        cy.checkRequiredFields(requiredFields)
    })
})