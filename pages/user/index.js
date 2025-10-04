import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function UserPortal() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        
        console.log("API Response:", data); // Check what's returned
        console.log("Is array?", Array.isArray(data));
        
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Products</h1>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((p) => (
            <div key={p.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <strong>{p.name}</strong> - ₹{p.price}
              <p>{p.description}</p>
              {p.image && <img src={p.image} width={150} alt={p.name} />}
            </div>
          ))
        )}
      </div>
    </>
  );
}