import AddProductForm from '@/components/custom/AddProductForm'
import ProtectRoute from '@/components/custom/ProtectRoute'

export default function AddProductPage() {
  return (
    <ProtectRoute>

    <main className="max-w-2xl mx-auto p-6">
      
      <AddProductForm />
    </main>
    </ProtectRoute>
  )
}
