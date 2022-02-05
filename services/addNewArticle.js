const {
    _getDB,
} = require('./db')

function addNewArticle(item) {
    return _getDB()
        .then((db) => {
            return db.collection('shopitems')
                .insertOne(item)
        })
    console.log('insert new article to shopitems')
}

module.exports = {
    addNewArticle
}