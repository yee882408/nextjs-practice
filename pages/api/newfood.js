import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://saw634703:saw249324@cluster0.mxakvhc.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const foodsCollection = db.collection("meetups");

    const result = await foodsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
