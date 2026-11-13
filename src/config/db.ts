import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;

declare global {
  var _mongoClient: MongoClient | undefined;
}

const client =
  globalThis._mongoClient ||
  new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._mongoClient = client;
}

export const database = client.db("dars");