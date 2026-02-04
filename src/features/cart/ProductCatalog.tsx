import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addToCart } from "./cartSlice"
import styles from "./Cart.module.css"

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "🎧",
  },
  {
    id: 2,
    name: "USB-C Cable",
    price: 12.99,
    image: "🔌",
  },
  {
    id: 3,
    name: "Phone Stand",
    price: 15.99,
    image: "📱",
  },
  {
    id: 4,
    name: "Laptop Case",
    price: 34.99,
    image: "💼",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 24.99,
    image: "🖱️",
  },
  {
    id: 6,
    name: "Screen Protector",
    price: 9.99,
    image: "🛡️",
  },
]

export function ProductCatalog() {
  const dispatch = useAppDispatch()

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    )
  }

  return (
    <div className={styles.catalog}>
      <h2>Products</h2>
      <div className={styles.productGrid}>
        {PRODUCTS.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>{product.image}</div>
            <h3>{product.name}</h3>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <button
              className={styles.addButton}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
