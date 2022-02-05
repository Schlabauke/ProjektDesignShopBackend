const { passwordHash } = require('../utility')
const { getUserByEmail, createNewUser } = require('../db-access/userdao');

async function registerUser({ firstname, lastname, email, password }) {
    //check for email already exist
    const foundUser = await getUserByEmail(email)
    if (foundUser) {
        throw new Error('User with this email already exists')
    }

    const hashPW = passwordHash(password)
    //create new User-temp
    const newUser = {
        firstname,
        lastname,
        email,
        hashPW
    }
    const insertResult = await createNewUser(newUser)
    if (!insertResult.acknowledged) {
        throw new Error('Failed to create new user,please try again.')
    }
    return;
}

module.exports = {
    registerUser
}