import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uid, name, email, role } = req.body;
    try {
      const client = await clientPromise;
      const db = client.db("ecommerceDB");

      // Save user if not exists
      await db.collection("users").updateOne(
        { uid },
        { $set: { name, email, role } },
        { upsert: true }
      );

      res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error saving user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
