const {
    _getDB,
} = require('./db')

function addNewArticle(item) {
    return _getDB()
        .then((db) => {
            return db.collection('shopitems')
                .insertOne(item)
        })

}

module.exports = {
    addNewArticle
}