import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Extra pages in the exact sequence
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
