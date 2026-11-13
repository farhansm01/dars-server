import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export let connectError: any = null;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client
  .connect()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    connectError = err;
    console.error("MongoDB connect error:", err);
  });

export const database = client.db("dars");