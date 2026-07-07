import ProductCard from "./ProductCard"

const KATEGORI_LIST = ["Semua", "Makanan", "Minuman"]
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "termurah", label: "Termurah" },
  { value: "termahal", label: "Termahal" },
  { value: "nama", label: "Nama A-Z" },
]

function ProductList({
  produk,
  query,
  onQueryChange,
  kategori,
  onKategoriChange,
  sortBy,
  onSortByChange,
  onSelect,
}) {
  return (
    <section className="product-list">
      <label className="search-label" htmlFor="search-produk">
        Cari produk :
      </label>
      <input
        id="search-produk"
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Ketik nama produk..."
      />

      <div className="list-controls">
        <div className="kategori-filter">
          {KATEGORI_LIST.map((k) => (
            <button
              key={k}
              type="button"
              className={`btn btn--kategori ${kategori === k ? "btn--kategori-aktif" : ""}`}
              onClick={() => onKategoriChange(k)}
            >
              {k}
            </button>
          ))}
        </div>

        <label className="sort-label" htmlFor="sort-produk">
          Urutkan:
          <select
            id="sort-produk"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="product-grid">
        {produk.length === 0 ? (
          <p className="empty-text">Produk tidak ditemukan</p>
        ) : (
          produk.map((p) => (
            <ProductCard key={p.id} produk={p} onSelect={onSelect} />
          ))
        )}
      </div>
    </section>
  )
}

export default ProductList
