const config = require('config');
const dbUri = config.get('mongoURI');
var MongoClient = require('mongodb').MongoClient;

var DbConnection = function () {

    var db = null;
    var instance = 0;

    async function DbConnect() {
        try {
            let url = dbUri;
            let _db = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

            return _db
        } catch (e) {
            return e;
        }
    }

    async function Get() {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            console.log(`DbConnection called ${instance} times`);

            if (db != null) {
                console.log(`db connection is already alive`);
                return db;
            } else {
                console.log(`getting new db connection`);
                db = await DbConnect();
                return db;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}


module.exports = DbConnection();