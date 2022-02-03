const {
    _getDB,
} = require('../db-access/db')


//find all items
function getAllItems() {
    return _getDB() // Funktionsaufruf aus db.js
        .then((db) => {
            const shopItems = db.collection('shopitems')
                .find() //gibt alle Produkte aus
                .toArray() //macht den Datensatz zum Array,für iteration
            return shopItems //itemsarray
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    getAllItems
}