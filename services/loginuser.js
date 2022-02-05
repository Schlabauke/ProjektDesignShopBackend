const jwt = require('jsonwebtoken')
const { getUserByEmail } = require('../db-access/userdao')
const { passwordHash } = require('../utility')

const generateToken = (user) => {
    const now = Date.now() / 1000
    const one_day = 24 * 60 ** 2
    const expired = now + one_day

    const token = jwt.sign({
        sub: user._id,//für wen ist der token?
        iat: now, //erstellt um ...
        exp: expired, //läuft ab nach..
        type: 'access_token',
    }, process.env.JWT_SECRET)

    return token
}

async function loginUser({ email, password }) {
    const foundUser = await getUserByEmail(email) //check for already existing
    if (!foundUSer) {
        throw new Error('USer not found')
    }

    const hashPW = passwordHash(password)
    const correctPW = foundUser.hashPW === hashPW
    if (!correctPW) {
        throw new Error('Email & Password do not match')
    }
    const token = generateToken(foundUser)
    return token
}

module.exports = {
    loginUser
}