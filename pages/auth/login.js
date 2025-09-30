import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch saved user
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please signup first.");
      return;
    }

    if (savedUser.email === form.email && savedUser.password === form.password) {
      alert("Login successful!");

      if (savedUser.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="submit-btn">Login</button>
          <p style={{ marginTop: "10px" }}>
            Don’t have an account? <Link href="/auth/signup">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
}
