export default function MyProducts() {
  const products = [
    { name: "Electronics", image: "public/images/electronics.jpg" },
    { name: "Clothing", image: "public/images/clothing.jpg" },
    { name: "Books", image: "public/images/books.jpg" },
    { name: "Furniture", image: "public/images/furniture.jpg" },
    { name: "Accessories", image: "public/images/accessories.jpg" },
    { name: "Sports Gear", image: "public/images/sports.jpg" },
    { name: "Toys", image: "public/images/toys.jpg" },
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
