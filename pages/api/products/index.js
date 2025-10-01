import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("ecommerceDB");

  if (req.method === "POST") {
    const { name, imageUrl, price, description } = req.body;
    if (!name || !imageUrl || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const result = await db.collection("products").insertOne({ name, imageUrl, price, description });
      return res.status(201).json({ message: "Product added", productId: result.insertedId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add product" });
    }
  }

  else if (req.method === "GET") {
    try {
      const products = await db.collection("products").find({}).toArray();
      return res.status(200).json(products);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
