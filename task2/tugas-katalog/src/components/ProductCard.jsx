import { formatRupiah } from "../utils/formatRupiah"
import { useCart } from "../context/CartContext"

function ProductCard({ produk, onSelect }) {
  const { addToCart } = useCart()
  const { nama, harga, stok } = produk

  return (
    <div className="product-card" onClick={() => onSelect(produk)}>
      <h3 className="product-card__nama">{nama}</h3>
      <p className="product-card__harga">{formatRupiah(harga)}</p>
      <span className={`badge ${stok ? "badge--tersedia" : "badge--habis"}`}>
        {stok ? "Tersedia" : "Habis"}
      </span>
      <button
        type="button"
        className="btn btn--tambah"
        onClick={(e) => {
          e.stopPropagation()
          addToCart(produk)
        }}
        disabled={!stok}
      >
        + Tambah
      </button>
    </div>
  )
}

export default ProductCard
