import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  const email = req.query.email;
  console.log("Query email:", req.query.email);
  if (!entries || entries.length == 0){

    return res.status(404).json({message: "USER NOT FOUND"})
  }
  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Predictions");
    const entries = await db
      .collection("predVal")
      .find({ email}) // filter all entries where `email` matches
      .toArray();

    res.status(200).json(entries);
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    res.status(500).json({ error: "Internal server error" });
  }


}