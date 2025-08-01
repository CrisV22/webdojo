const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient')

const app = express()
const port = 3333

// Permite Express receber dados em JSON
app.use(express.json())

// Habilita CORS para todas as origens
app.use(cors())

// Middleware para verificar se o JSON Está Bem Formatado
app.use((err, req, res, next) => {
    console.log(err)

    if (err instanceof SyntaxError) return res.status(400).json({ error: 'Invalid JSON format.' })

    // Fala para o Express passar para o próximo bloco de código que deve ser executado.
    next()
})

app.get('/', (req, res) => {
    res.json({
        message: "listening"
    })
})

app.post('/api/users/register', async (req, res) => {
    
    // console.log(req.body)
    if (!req.body) return res.status(400).json({error: 'Request without a body.'})
    
    // Abordagem 3: req e res
    const { name, email, password } = req.body

    // Camada de validação
    if (!name) return res.status(400).json({ error: 'Name is required!' })
    if (!email) return res.status(400).json({ error: 'Email is required!' })
    if (!password) return res.status(400).json({ error: 'Password is required!' })

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered!' })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password // você pode usar bcrypt aqui para segurança
            }
        })

        return res.status(201).json({
            message: 'User sucessfully registered!',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }

    // Abordagem 2: Testar retorno JSON
    // console.log(req.body)
    // return res.status(201).json({
    //     message: 'Usuário cadastrado com sucesso!'
    // })

    // Abordagem 1: Testar integração Bruno e API
    // return res.status(201).end()
})

app.get('/api/users', async (req, res) => {

    try {
        // Consultando usuários com prisma
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })

        res.status(200).json(users)
    } catch (error) {
        // Impedindo que a API pare de funcionar em caso de qualquer erro no servidor
        return res.status(500).json({ error: 'Error fetching users.' })
    }

})

app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params

    if (!req.body) return res.status(400).json({error: 'Request without a body.'})

    const { name, email, password } = req.body

    // Camada de validação
    if (!name) return res.status(400).json({ error: 'Name is required!' })
    if (!email) return res.status(400).json({ error: 'Email is required!' })
    if (!password) return res.status(400).json({ error: 'Password is required!' })

    try {
        // TRATANDO ID INEXISTENTE
        const user = await prisma.user.findUnique({
            where: {id: Number(id)}
        })

        if (!user) return res.status(404).json({error: 'User not found.'})

        // ATUALIZANDO
        // Abordagem 2:
        await prisma.user.update({
            where: { id: Number(id) }, // Casting para id string virar inteiro
            data: {
                name, email, password // Setando novos dados
            }
        })


        res.status(204).end()

        // Abordagem 1:
        // Pegando id do usuário
        // res.status(200).json(req.params.id)
    } catch (error) {
        res.status(500).json({ error: 'Error updating user.' })
    }
})

app.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params

    try {
        // TRATANDO ID INEXISTENTE
        const user = await prisma.user.findUnique({
            where: {id: Number(id)}
        })

        if (!user) return res.status(404).json({error: 'User not found.'})

        // DELETANDO
        await prisma.user.delete({
            where: {id: Number(id)}
        })
        return res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user.' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
