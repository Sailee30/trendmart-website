import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(form));

    alert("Signup successful! Please login.");
    router.push("/auth/login");
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <select name="role" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="submit-btn">Signup</button>
          <p style={{ marginTop: "10px" }}>
            Already have an account? <Link href="/auth/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
