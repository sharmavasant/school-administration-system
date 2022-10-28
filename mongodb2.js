const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const databaseName = 'teachers';
const client = new MongoClient(url);

async function dbConnect2() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection('data1');
}

module.exports = dbConnect2;