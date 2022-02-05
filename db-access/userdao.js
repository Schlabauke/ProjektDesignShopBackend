const { _getDB } = require('./db')


//find user with this email
async function getUserByEmail(email) {
    const db = await _getDB()
    const foundUser = await db.collection('users').findOne({ email })
    return foundUser
}

async function userNameOrEmailExists(email) {
    const db = await _getDB()
    const user = await db.colection('users').findOnde({
        $or: [
            { email: email }
        ]
    })
    return user
}

async function createNewUser(user) {
    const db = await _getDB()
    const createdUser = await db.collection('users').insertOne(user)
    return createdUser
}

module.exports = {
    getUserByEmail,
    userNameOrEmailExists,
    createNewUser
}