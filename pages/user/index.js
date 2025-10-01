// pages/user/index.js
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function UserPortal() {
  const [products, setProducts] = useState([]);

  // Fetch products from our API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>User Portal</h1>
        <p>Welcome to your shopping dashboard 🎉</p>

        <h2>Available Products</h2>
        {products.length === 0 ? (
          <p>No products available yet.</p>
        ) : (
          <ul style={{ marginTop: "20px" }}>
            {products.map((p, i) => (
              <li key={i} style={{ marginBottom: "20px" }}>
                <strong>{p.name}</strong> - ₹{p.price}
                <br />
                <em>{p.description}</em>
                <br />
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "150px", marginTop: "10px" }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
