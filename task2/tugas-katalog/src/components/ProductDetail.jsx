import { formatRupiah } from "../utils/formatRupiah"

function ProductDetail({ product, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img className="modal-content__image" src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p className="modal-content__harga">{formatRupiah(product.harga)}</p>
        <p className="modal-content__kategori">Kategori: {product.category}</p>
        <p className="modal-content__deskripsi">{product.description}</p>
        <button type="button" className="btn btn--tutup" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
