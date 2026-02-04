import { ProductCatalog } from "./ProductCatalog"
import { CartDisplay } from "./CartDisplay"
import styles from "./Cart.module.css"

export function EcommerceCart() {
  return (
    <div>
      <h1>E-Commerce Store</h1>
      <ProductCatalog />
      <CartDisplay />
    </div>
  )
}
