// pages/api/admin/add-product.js
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, price, description, image } = req.body;
    const client = await clientPromise;
    const db = client.db("ecommerceDB");
    await db.collection("products").insertOne({ name, price, description, image });
    res.status(200).json({ message: "Product added" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
