import { formatRupiah } from "../utils/formatRupiah"
import { useCart } from "../context/CartContext"

function CartSidebar() {
  const { cart, removeFromCart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0)

  return (
    <section className="cart-sidebar">
      <div className="cart-sidebar__header">
        <h2>Keranjang ({cart.length} item)</h2>
        <span className="cart-sidebar__total">Total: {formatRupiah(total)}</span>
      </div>
      <hr />
      {cart.length === 0 ? (
        <p className="empty-text">Keranjang kosong</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <span className="cart-item__nama">
                {item.nama} × {item.qty}
              </span>
              <span className="cart-item__harga">
                {formatRupiah(item.harga * item.qty)}
              </span>
              <button
                type="button"
                className="btn btn--hapus"
                onClick={() => removeFromCart(item.id)}
              >
                hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CartSidebar
