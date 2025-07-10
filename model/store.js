import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;  // Use environment variable
const MONGODB_DB = process.env.MONGODB_DB || "login";

export default async function handler(req, res) {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(MONGODB_DB);
    const collections = await db.listCollections().toArray(); // List collections in the DB

    client.close();
    res.status(200).json({ success: true, collections });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

