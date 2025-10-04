import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const All = [
    "Services", "Pricing", "FAQs", "Testimonials", "Blog", "Careers",
    "Electronics", "Clothing", "Books", "Furniture", "Accessories",
    "Beauty Products", "Sports Gear", "Toys", "Food & Beverages",
    "Stationery", "New Arrivals", "Best Sellers", "Offers & Discounts",
    "Seasonal Sale", "Featured Products", "Our Mission", "Our Vision",
    "Our Team", "Partners", "Achievements", "Help Center", "Shipping Info",
    "Return Policy", "Privacy Policy", "Terms & Conditions", "Gallery",
    "Events", "Newsletter", "Community", "Contact Support"
  ];

  return (  
    <nav className="navbar">
        <Link href="/" className="navLink">Home</Link>
        <Link href="/about" className="navLink">About Us</Link>
        <Link href="/myproducts" className="navLink">My Products</Link>
        <Link href="/contact" className="navLink">Contact Us</Link>
        
        {!user ? (
          <>
            <Link href="/auth/login" className="navLink">Login</Link>
            <Link href="/auth/signup" className="navLink">Signup</Link>
          </>
        ) : (
          <>
            <span className="navLink" style={{ cursor: "default" }}>
             {user.name}
            </span>
            <button 
              onClick={handleLogout} 
              className="navLink" 
              style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit"}} 
            >
              Logout
            </button>
          </>
        )}

        <div className="dropdown">
          <span className="navLink" onClick={() => setOpen(!open)}>
              All ▼
          </span>

          <div className={`dropdownMenu ${open ? "open" : ""}`}>
              {All.map((page, idx) => (
                <Link
                    key={idx}
                    href={`/${page.toLowerCase().replace(/ & | /g, "-")}`}
                    className="dropdownItem"
                >
                  {page}
                </Link>
              ))}
          </div>
        </div>
    </nav>
  );
}