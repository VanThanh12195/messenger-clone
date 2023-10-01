export default async function getUserCollection() {
  // Read .env file and set environment variables
  require("dotenv").config();

  // Use official mongodb driver to connect to the server
  const { MongoClient } = require("mongodb");

  // New instance of MongoClient with connection string
  // for Cosmos DB
  const url = process.env.COSMOS_CONNECTION_STRING;
  const client = new MongoClient(url);

  await client.connect();

  // Database reference with creation if it does not already exist
  const db = client.db("Messenger-Clone");
  console.log(`New database:\t${db.databaseName}\n`);

  // Collection reference with creation if it does not already exist
  const collection = db.collection("Users");
  console.log(`New collection:\t${collection.collectionName}\n`);

  return [ client, collection ];
}
