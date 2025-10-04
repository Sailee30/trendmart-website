import Navbar from "../../components/Navbar"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPortal() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "ADMIN") {
      alert("Access denied. Admin only.");
      router.push("/auth/login");
    }
  }, [router]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage("✅ Product added successfully!");
        setProduct({ name: "", price: "", description: "" });
        setImage(null);
        document.getElementById("imageInput").value = "";
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Admin Portal</h1>
        <p>Upload and manage your products here</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required/>
          <input type="number" step="0.01" name="price" placeholder="Product Price (e.g., ₹999 or $99)" value={product.price} onChange={handleChange} required/>
          <textarea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} required/>
          <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} required/>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", padding: "10px", borderRadius: "5px", backgroundColor: message.includes("✅") ? "#dfd" : "#fee" }}>
            {message}
          </p>
        )}
      </div>
    </>
  );
}