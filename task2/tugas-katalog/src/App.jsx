import { useEffect, useState } from "react"
import { products as fallbackProducts } from "./data/products"
import { CartProvider } from "./context/CartContext"
import ProductList from "./components/ProductList"
import CartSidebar from "./components/CartSidebar"
import CheckoutForm from "./components/CheckoutForm"
import ProductDetail from "./components/ProductDetail"
import "./App.css"

const KURS_USD_KE_IDR = 15000

function petakanProdukApi(item) {
  return {
    id: item.id,
    nama: item.title,
    harga: Math.round(item.price * KURS_USD_KE_IDR),
    stok: true,
    kategori: item.category,
    image: item.image,
    description: item.description,
    title: item.title,
    category: item.category,
  }
}

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchInput, setSearchInput] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [kategori, setKategori] = useState("Semua")
  const [sortBy, setSortBy] = useState("default")
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    console.log("App loaded")
  }, [])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.map(petakanProdukApi))
        setLoading(false)
      })
      .catch(() => {
        setProducts(fallbackProducts)
        setError("Gagal mengambil data produk dari API, menampilkan data cadangan.")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const produkTerfilter = products.filter((p) => {
    const cocokQuery = p.nama.toLowerCase().includes(debouncedSearch.toLowerCase())
    const cocokKategori = kategori === "Semua" || p.kategori === kategori
    return cocokQuery && cocokKategori
  })

  const produkTerurut = [...produkTerfilter].sort((a, b) => {
    if (sortBy === "termurah") return a.harga - b.harga
    if (sortBy === "termahal") return b.harga - a.harga
    if (sortBy === "nama") return a.nama.localeCompare(b.nama)
    return 0
  })

  return (
    <CartProvider>
      <div className="app">
        <h1 className="app__title">Mini Product Catalog</h1>

        {loading && <p className="status-text">Loading produk...</p>}
        {error && <p className="status-text status-text--error">{error}</p>}

        {!loading && (
          <>
            <ProductList
              produk={produkTerurut}
              query={searchInput}
              onQueryChange={setSearchInput}
              kategori={kategori}
              onKategoriChange={setKategori}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onSelect={setSelectedProduct}
            />

            <CartSidebar />

            <CheckoutForm />
          </>
        )}

        {selectedProduct && (
          <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </div>
    </CartProvider>
  )
}

export default App
