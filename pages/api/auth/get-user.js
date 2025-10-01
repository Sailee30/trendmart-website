import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { uid } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("ecommerceDB");

    const user = await db.collection("users").findOne({ uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
}
