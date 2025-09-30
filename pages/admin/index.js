import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function AdminPortal() {
  // Single product being filled in the form
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // List of all added products
  const [products, setProducts] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Add product to the list
  const handleAdd = (e) => {
    e.preventDefault();
    setProducts([...products, product]);
    setProduct({ name: "", price: "", description: "", image: "" }); // reset form
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Admin Portal</h1>
        <p>Upload and manage your products here </p>

        {/* Product Form */}
        <form onSubmit={handleAdd} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Product Image URL"
            value={product.image}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>

        {/* Product List */}
        <h2 style={{ marginTop: "20px" }}>Product List</h2>
        <ul>
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
      </div>
    </>
  );
}
