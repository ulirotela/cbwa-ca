const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const DB_NAME = 'cbwa';
module.exports = () => {
  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        //checking error
        if (err) {
          console.log("==== get::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((err, docs) => {
          if (err) {
            console.log("==== get::MongoClient.find")
            console.log(err)
            return reject(err)
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        //checking error
        if (err) {
          console.log("add::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (err, result) => {
          if (err) {
            console.log("add::MongoClient.insertOne")
            console.log(err)
            return reject(err)
          }
          resolve(result);
          client.close();
        });
      });
    });
  };

  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        //checking error
        if (err) {
          console.log("count::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.countDocuments({}, (err, result) => {
          if (err) {
            console.log("count::MongoClient.countDocuments")
            console.log(err)
            return reject(err)
          }
          resolve(result);
          client.close();
        });
      });
    });
  };
  const aggregate = (collectionName, pipeline = []) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        //checking error
        if (err) {
          console.log("aggregate::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.aggregate(pipeline).toArray((err, docs) => {
          if (err) {
            console.log("aggregate::MongoClient.countDocuments")
            console.log(err);
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };
  const update = (collectionName, pipeline, condition  ) => {
    console.log(pipeline)
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        //checking error
        if (err) {
          console.log("update::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.updateOne(pipeline, condition, (err, result) => {
          if (err) {
            console.log("update::MongoClient.updateOne")
            console.log(err)
            return reject(err)
          }
          resolve(result);
          client.close();
        });
      });
    });
  };
  return {
    get,
    add,
    count,
    aggregate,
    update,
  };
};