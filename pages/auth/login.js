import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // Store token and user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      } else {
        setError(data.error || "Login failed");
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
        <h1>Login</h1>
        
        {error && (
          <div style={{ backgroundColor: "#fee", color: "#c00", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required/>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link href="/auth/signup">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
}