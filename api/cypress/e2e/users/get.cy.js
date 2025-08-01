import { testLevel } from '../../fixtures/levels.json'

describe('GET /api/users', () => {
    context(testLevel.level1, () => {
        const mockUsers = [
            {
                name: "Alice Johnson",
                email: "alice.johnson@get-mock.com",
                password: "pwd123"
            },
            {
                name: "Bob Smith",
                email: "bob_smith@get-mock.com",
                password: "pwd123"
            },
            {
                name: "Carlos Silva",
                email: "carlos.silva@get-mock.com.br",
                password: "pwd123"
            }
        ]

        before(() => {
            mockUsers.forEach(mockUser => {
                cy.postUser(mockUser)
            })
        })

        it('Deve retornar uma lista de usuários', () => {
            cy.getUsers().then(res => {
                expect(res.status).to.eql(200)

                mockUsers.forEach((mockUser) => {
                    // Pegando apenas os dados dos usuários cadastrados no Mock
                    const found = res.body.find((user) => user.email === mockUser.email)

                    // Verificação dados opcionais
                    // console.log(found)
                    expect(found).to.have.property('id')
                    expect(found.name).to.eq(mockUser.name)
                    expect(found.email).to.eq(mockUser.email)
                })
            })
        })
    })
})