const pgp = require('pg-promise')()

const db = pgp({
    // Monstando conexão
    host: 'localhost',
    database: 'UserDB',
    user: 'dba',
    password: 'dba'
})

function deleteUserByEmail(email) {
    // Função utilizada para fazer uma deletar email único sem retornar dados
    return db.none('delete from public."User" where email = $1', [email])
}

module.exports = {
    deleteUserByEmail
}