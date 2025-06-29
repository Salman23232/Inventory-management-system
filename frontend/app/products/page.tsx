import ProductGrid from '@/components/custom/ProductGrid'
import ProtectRoute from '@/components/custom/ProtectRoute'

export default function ProductsPage() {
  return (
    <ProtectRoute>

    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductGrid />
    </main>
    </ProtectRoute>
  )
}
