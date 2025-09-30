import Navbar from "../../components/Navbar";

export default function UserPortal() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>User Portal</h1>
        <p>Welcome to your shopping dashboard! 🎉</p>
        <ul>
          <li>🛒 Browse products</li>
          <li>❤️ View your wishlist</li>
          <li>📦 Track your orders</li>
        </ul>
      </div>
    </>
  );
}
