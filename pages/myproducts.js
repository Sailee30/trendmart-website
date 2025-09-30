import Image from "next/image";
import styles from "../styles/MyProducts.module.css"; // we'll create a CSS module

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
    <div className={styles.pageContainer}>
      <h1>Our Products</h1>
      <div className={styles.productsGrid}>
        {products.map((product, i) => (
          <div key={i} className={styles.productCard}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className={styles.productImage}
            />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}