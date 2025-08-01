import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      // Mesma senha facilita a gestão dos dados
      password: 'pwd123'
    }

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

  it('Não deve passar quando o JSON estiver mal formatado', () => {
    const user = `{
      name: 'Erro JSON',
      email: 'json@format-error.com'
      password: 'pwd123'
    }`

    cy.postUser(user).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq('Invalid JSON format.')
    })
  })

  it('Não deve cadastrar email duplicado', () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      // Mesma senha facilita a gestão dos dados
      password: 'pwd123'
    }

    cy.postUser(user).then((res) => {
      expect(res.status).to.eq(201)
    })

    cy.postUser(user).then((res) => {
      expect(res.status).to.eq(409)
      expect(res.body.error).to.eq('Email already registered!')
    })
  })

  it('O campo name deve ser obrigatório', () => {
    const user = {
      email: faker.internet.email(),
      password: 'pwd123'
    }

    cy.postUser(user).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq('Name is required!')
    })
  })

  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Cristian Oliveira',
      password: 'pwd123'
    }

    cy.postUser(user).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq('Email is required!')
    })
  })

  it('O campo senha deve ser obrigatório', () => {
    const user = {
      name: 'Cristian Oliveira',
      email: faker.internet.email()
    }

    cy.postUser(user).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq('Password is required!')
    })
  })
})

Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: 'http://localhost:3333/api/users/register',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})