// Usar faker para valores chave (caso do campo email) vai encher o banco de dados com muitos dados.
// Complica a saúde dos dados
// Aumenta o custo operacional do DB

// import { faker } from '@faker-js/faker'
import { testLevel } from '../../fixtures/levels.json'

describe('POST /api/users/register', () => {

  context(testLevel.level1, () => {
    it('Deve cadastrar um novo usuário', () => {
      const user = {
        name: 'Sem Faker',
        // @cadastro para facilitar análise no DB
        email: 'sem-faker@cadastro.com',
        // Mesma senha facilita a gestão dos dados
        password: 'sem-faker'
      }

      // Garantindo que o email nunca irá existir antes de rodar o teste
      cy.task('deleteUser', user.email)

      // Requisição e asserções
      cy.postUser(user).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.body.message).to.eq('User sucessfully registered!')
        // Verifica se id é do tipo uuid
        // expect(res.body.user.id).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

        // Verifica se id é do tipo inteiro
        expect(res.body.user.id).to.match(/^[-]?\d+$/)
        expect(res.body.user.name).to.eq(user.name)
        expect(res.body.user.email).to.eq(user.email)
      })
    })
  })

  context(testLevel.level2, () => {

  })

  context(testLevel.level3, () => {
    it('Não deve cadastrar email duplicado', () => {
      const user = {
        name: 'Sem Faker',
        // @cadastro para facilitar análise no DB
        email: 'email-duplicado@cadastro.com',
        // Mesma senha facilita a gestão dos dados
        password: 'sem-faker'
      }

      // Garantindo que o email nunca irá existir antes de rodar o teste
      cy.task('deleteUser', user.email)

      // Requisição e asserções

      cy.postUser(user).then((res) => {
        expect(res.status).to.eq(201)
      })

      cy.postUser(user).then((res) => {
        expect(res.status).to.eq(409)
        expect(res.body.error).to.eq('Email already registered!')
      })
    })
  })

  context(testLevel.level4, () => {
    it('O campo name deve ser obrigatório', () => {
      const user = {
        email: 'name-required@cadastro.com',
        password: 'pwd123'
      }

      cy.postUser(user).then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body.error).to.eq('Name is required!')
      })
    })

    it('O campo email deve ser obrigatório', () => {
      const user = {
        name: 'Email required',
        password: 'pwd123'
      }

      cy.postUser(user).then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body.error).to.eq('Email is required!')
      })
    })

    it('O campo senha deve ser obrigatório', () => {
      const user = {
        name: 'Password required',
        email: 'password-required@cadastro.com'
      }

      cy.postUser(user).then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body.error).to.eq('Password is required!')
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

      cy.postUser(user).then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body.error).to.eq('Invalid JSON format.')
      })
    })

    it('Não deve passar quando body undefined', () => {
      cy.log('develop')
    })
  })
})
