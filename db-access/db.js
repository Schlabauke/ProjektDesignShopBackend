const { MongoClient } = require('mongodb')
require('dotenv').config()

let _db;

function _getDB() {
    return new Promise((resolveDB, rejectWithErr) => {
        if (_db) {
            resolveDB(_db);
        } else {
            const url = process.env.DB_URL;
            const client = new MongoClient(url)

            client
                .connect()
                .then((connected_client) => {
                    _db = connected_client.db('DesignShop');
                    resolveDB(_db)
                })
                .catch((err) => rejectWithErr(err))
        }
    })
}

module.exports = {
    _getDB
}