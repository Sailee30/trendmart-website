import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),});
      const data = await res.json();

      if (data.success) {
        alert(`Signup successful! Welcome ${form.name}`);
        router.push("/auth/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Signup</h1>
        
        {error && (
          <div style={{ backgroundColor: "#fee", color: "#c00", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required/>
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required/>
          <input type="password" name="password" placeholder="Password (min 6 characters)" value={form.password} onChange={handleChange} required minLength={6}/>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
          <p style={{ marginTop: "10px" }}>
            Already have an account? <Link href="/auth/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}