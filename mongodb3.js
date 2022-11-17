const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const databaseName = 'headmasterteacher';
const client = new MongoClient(url);

async function dbConnect3() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection('data3');
}

module.exports = dbConnect3;