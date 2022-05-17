const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    await client.db("fruitsDB").command({ ping: 1 });
    console.log("Connected successfully to server");
    const database = client.db('fruitsDB');
    const fruits = database.collection('fruits');
    await fruits.insertMany([
      { name: "apple", score: 3 },
      { name: "orange", score: 4 }
     ]);
     const fruit = await fruits.findOne();
     console.log(fruit);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);