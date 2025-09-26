export default function MyProducts() {
  const products = [
    { name: "Electronics", image: "/images/electronics.jpg" },
    { name: "Clothing", image: "/images/clothing.jpg" },
    { name: "Books", image: "/images/books.jpg" },
    { name: "Furniture", image: "/images/furniture.jpg" },
    { name: "Accessories", image: "/images/accessories.jpg" },
    { name: "Sports Gear", image: "/images/sports.jpg" },
    { name: "Toys", image: "/images/toys.jpg" },
  ];

  return (
    <div className="page-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product, i) => (
          <div key={i} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
