'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchCategories, fetchProducts, deleteProduct } from '@/lib/api'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

type Category = {
  id: number
  name: string
}

type User = {
  id: string
  name: string
  email: string
}

type Product = {
  id: string
  name: string
  price: number
  image?: string | null
  category: Category
  user: User
}

const ProductGrid = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryIdFromQuery = searchParams.get('category_id') // string | null

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Active tab value is string of category id or 'all'
  const activeTab = categoryIdFromQuery ?? 'all'

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories()
      setCategories(cats)
    }
    loadCategories()
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const catId = activeTab === 'all' ? undefined : Number(activeTab)
      const prods = await fetchProducts(catId)
      setProducts(prods)
      setLoading(false)
    }
    loadProducts()
  }, [activeTab])

  const onDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    await deleteProduct(id)
    setProducts(products.filter((p) => p.id !== id))
  }

  // Handle tab change and update URL query param (without full reload)
  const onTabChange = (value: string) => {
    const url = new URL(window.location.href)
    if (value === 'all') {
      url.searchParams.delete('category_id')
    } else {
      url.searchParams.set('category_id', value)
    }
    router.replace(url.toString())
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Product Cards Grid */}
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="relative">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-3">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="rounded-md object-cover relative"
                  />
                ) : (
                  <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                    No Image
                  </div>
                )}
                <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  Category: <span className="font-medium">{product.category.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Added by: <span className="font-medium">{product.user.name}</span>
                </div>
              </CardContent>

              <Button
                variant="destructive"
                size="sm"
                className="absolute -right-2 cursor-pointer"
                onClick={() => onDelete(product.id)}
                aria-label="Delete product"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGrid
