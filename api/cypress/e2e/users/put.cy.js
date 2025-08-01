import { testLevel } from '../../fixtures/levels.json'

describe('PUT /api/users/:id', () => {
    context(testLevel.level1, () => {
        let userId

        // Massa de dados
        const mockOriginalUser = {
            name: 'Cristian Oliveira',
            email: 'cris@email.com',
            password: 'pwd123'
        }

        const mockUpdatedUser = {
            name: 'Cristian Oliveira Editado',
            email: 'cris@editado.com',
            password: 'pwd123-editado'
        }

        // Usuário para atualização
        before(() => {
            // Assegurando que os dados não existem no DB
            cy.task('deleteUser', mockOriginalUser.email)
            cy.task('deleteUser', mockUpdatedUser.email)

            // Cadastro usuário para atualização
            cy.postUser(mockOriginalUser)
                .then((res) => {
                    userId = res.body.user.id
                    // cy.log(userId)
                })
        })

        // Atualização usuário
        it('Deve atualizar um usuário existente', () => {
            cy.putUser(userId, mockUpdatedUser).then((res) => {
                expect(res.status).to.eq(204)
            })
        });

        // Verificando que o dado foi atualizado
        after(() => {
            cy.getUsers().then((res) => {
                // Pegando apenas os dados do usuário para atualização
                const found = res.body.find((user) => user.id === userId)

                // Asserção
                expect(found).to.exist
                expect(found.name).to.eq(mockUpdatedUser.name)
                expect(found.email).to.eq(mockUpdatedUser.email)

                // console.log(found)
            })
        })
    })

    context(testLevel.level2, () => {

    })

    context(testLevel.level3, () => {

    })

    context(testLevel.level4, () => {
        it('O campo name deve ser obrigatório', () => {
            const user = {
                email: 'name-required@cadastro.com',
                password: 'pwd123'
            }

            cy.putUser(-1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq('Name is required!')
            })
        })

        it('O campo email deve ser obrigatório', () => {
            const user = {
                name: 'Email required',
                password: 'pwd123'
            }

            cy.putUser(-1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq('Email is required!')
            })
        })

        it('O campo senha deve ser obrigatório', () => {
            const user = {
                name: 'Password required',
                email: 'password-required@cadastro.com'
            }

            cy.putUser(-1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq('Password is required!')
            })
        })

        it('Deve retornar 404 e User not found', () => {
            let userId = -1
            cy.deleteUser(userId).then((res) => {
                expect(res.status).to.eq(404)
                expect(res.body.error).to.eq('User not found.')
            })
        })
    })

    context(testLevel.level5, () => {
        it('Não deve passar quando o JSON estiver mal formatado', () => {
            const user = `{
                name: 'SyntaxError JSON',
                email: 'json@cadastro.com'
                password: 'pwd123'
            }`

            cy.putUser(-1, user).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq('Invalid JSON format.')
            })
        })
    })
})