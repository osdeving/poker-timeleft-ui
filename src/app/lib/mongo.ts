import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URL) {
  throw new Error("Please add your MONGO_URL to .env");
}

if (process.env.NODE_ENV === "development") {
if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
