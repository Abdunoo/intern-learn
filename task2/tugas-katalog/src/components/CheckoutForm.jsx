import { useState } from "react"
import { useCart } from "../context/CartContext"

function CheckoutForm() {
  const { cart, clearCart } = useCart()
  const cartKosong = cart.length === 0
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sukses, setSukses] = useState(false)

  const errorNama =
    nama.length > 0 && nama.length < 3 ? "Nama minimal 3 karakter" : nama.length === 0 ? "Nama tidak boleh kosong" : ""
  const errorEmail =
    email.length > 0 && !email.includes("@")
      ? "Email harus mengandung karakter @"
      : email.length === 0
        ? "Email tidak boleh kosong"
        : ""

  const formValid = nama.length >= 3 && email.includes("@") && email.length > 0

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (!formValid || cartKosong) return

    clearCart()
    setNama("")
    setEmail("")
    setSubmitted(false)
    setSukses(true)
  }

  return (
    <section className="checkout-form">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="nama">Nama :</label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => {
              setNama(e.target.value)
              setSukses(false)
            }}
          />
          {submitted && errorNama && <p className="form-error">{errorNama}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setSukses(false)
            }}
          />
          {submitted && errorEmail && <p className="form-error">{errorEmail}</p>}
        </div>

        {nama && email && (
          <p className="live-preview">
            Halo, {nama}! Pesanan akan dikirim ke {email}
          </p>
        )}

        {submitted && cartKosong && (
          <p className="form-error">Keranjang tidak boleh kosong saat checkout</p>
        )}

        {sukses && <p className="form-success">Checkout berhasil! Terima kasih.</p>}

        <button type="submit" className="btn btn--checkout" disabled={!formValid || cartKosong}>
          Checkout
        </button>
      </form>
    </section>
  )
}

export default CheckoutForm
