const crypto = require('crypto')

const passwordHash = (password) => {
    return crypto.createHash('sha256').update(password, 'utf-8').digest('hex')
}

module.exports = {
    passwordHash
}