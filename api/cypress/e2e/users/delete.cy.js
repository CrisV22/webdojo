import {testLevel} from '../../fixtures/levels.json'

describe('DELETE /api/users/:id', () => {
    context(testLevel.level1, () => {
        let userId

        // MOCK
        const user = {
            name: 'Cristian Oliveira',
            email: 'cris@deletar.com',
            password: 'pwd123'
        }

        // CERTIFICANDO CENÁRIO PRÉ-TESTE
        before(() => {
            // Deleta usuário
            cy.task('deleteUser', user.email)

            // Cadastra usuário
            cy.postUser(user).then((res) => {
                cy.log(res.body.user.id)
                userId = res.body.user.id
            })
        })

        // DELETANDO
        it('Deve remover um usuário existente', () => {
            cy.deleteUser(userId).then((res) => {
                expect(res.status).to.eq(204)
            })
        })

        // CERTIFICANDO QUE FOI REMOVIDO
        after(() => {
            cy.getUsers().then((res) => {
                // Pegando apenas os dados do usuário para atualização
                const found = res.body.find((user) => user.id === userId)

                // Asserção
                expect(found).to.be.undefined

                // console.log(found)
            })
        })
    })

    context(testLevel.level4, () => {
        let userId = -1

        // DELETANDO
        it('Deve remover um usuário existente', () => {
            cy.deleteUser(userId).then((res) => {
                expect(res.status).to.eq(404)
                expect(res.body.error).to.eq('User not found.')
            })
        })
    })
})

