const { _getDB } = require('./db')

//getallShopItems
async function getAllItems() {
    const db = await _getDB()
    const shopItems = await db.collection('shopitems')
    .find()
    .toArray()
    console.log('AllItems',shopItems)
    return shopItems
}

// addProduct
async function addProduct(item){
    const db= await _getDB()
    const addProduct = await db.collection('shopitems')
    .insertOne(item)
    return item
}
//Items on Sale
async function findItems() {
    const db = await _getDB()
    const foundItems = await db.collection('shopitems')
    .find({ Price: { $lte: 30 } })
    .toArray()
    console.log('foundItems Sale:', foundItems)
    return foundItems
}

module.exports = {
    getAllItems,
    findItems,
    addProduct
}