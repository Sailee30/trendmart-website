import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Signup in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Save user data to MongoDB through API
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: form.name,
          email: form.email,
          role: form.role,
        }),
      });

      alert(`Signup successful! Welcome ${form.name}`);
      router.push("/auth/login");
    } catch (error) {
      alert(error.message);
    }
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
