import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Fetch role from MongoDB
      const res = await fetch(`/api/auth/get-user?uid=${user.uid}`);
      const data = await res.json();

      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (error) {
      alert(error.message);
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
