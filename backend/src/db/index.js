const { MongoClient } = require("mongodb");

const db = {
    async connect(mongoUri, database, collections, connectionOptions) {
        this.client = await MongoClient.connect(mongoUri, connectionOptions);

        for (let i = 0; i < collections.length; i++) {
            this[collections[i]] = await this.client.db(database).collection(collections[i]);
        }

        console.log("Database connnected");
    }
};

module.exports = db;