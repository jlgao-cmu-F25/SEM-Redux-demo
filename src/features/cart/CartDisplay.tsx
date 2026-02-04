import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { clearCart, removeFromCart, updateQuantity } from "./cartSlice"
import styles from "./Cart.module.css"

export function CartDisplay() {
  const dispatch = useAppDispatch()
  const { items, totalAmount } = useAppSelector(state => state.cart)

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleQuantityChange = (id: number, quantity: string) => {
    const q = parseInt(quantity, 10)
    if (!isNaN(q)) {
      dispatch(updateQuantity({ id, quantity: q }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {items.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>{item.image}</div>
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className={styles.itemQuantity}>
                  <label htmlFor={`qty-${item.id}`}>Qty:</label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, e.target.value)}
                    className={styles.quantityInput}
                  />
                </div>
                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <div className={styles.totalAmount}>
              Total: ${totalAmount.toFixed(2)}
            </div>
            <div className={styles.actions}>
              <button className={styles.checkoutButton}>Checkout</button>
              <button className={styles.clearButton} onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
