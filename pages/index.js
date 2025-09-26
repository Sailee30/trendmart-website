export default function Home() {
  return (
    <div className="page-container">
      {/* Hero / Banner Section */}
      <div className="hero">
        <h1> Welcome to TrendMart </h1>
        <p> Your ultimate destination for Electronics, Clothing, Books, Furniture & more. </p>
      </div>

      {/* Featured / Highlights */}
      <div className="highlights">
        <div className="highlight-item">
          <h3> Free & Fast Delivery </h3>
          <p> Across all orders </p>
        
          <h3> Secure Payments </h3>
          <p> 100% secure checkout </p>
        
          <h3> Best Offers </h3>
          <p> Deals updated daily </p>
        </div>
      </div>
    </div>
  );
}
