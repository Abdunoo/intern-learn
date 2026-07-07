import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.title = `Keranjang (${cart.length})`
  }, [cart])

  function addToCart(produk) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === produk.id)
      if (existing) {
        return prev.map((item) =>
          item.id === produk.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }
      return [...prev, { ...produk, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
