'use client'

import React, { useEffect, useState, useRef } from 'react'
import { fetchCategories, addProduct } from '@/lib/api'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Category = {
  id: number
  name: string
}

const AddProductForm = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories()
      setCategories(cats)
      if (cats.length > 0) setSelectedCategory(cats[0].id.toString())
    }
    loadCategories()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
    }
  }

  const resetForm = () => {
    setName('')
    setPrice('')
    setImageFile(null)
    setSelectedCategory(categories[0]?.id.toString())
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !price || !selectedCategory || !imageFile) {
      toast.error(
'Please fill all fields and select an image.',
      )
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('categoryId', selectedCategory)
    formData.append('image', imageFile)

    try {
      setLoading(true)
      await addProduct(formData)
      toast.success('Success',)
      resetForm()
      router.push('/products')
    } catch (error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : 'An unexpected error occurred'
  toast.error(message)
} finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto"
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill in the details below to add a product.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price ($)
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-100 file:text-indigo-700
                  hover:file:bg-indigo-200
                  transition-colors"
                required
              />
              {imageFile && (
                <p className="mt-1 text-sm text-gray-700">Selected: {imageFile.name}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Adding...' : 'Add Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AddProductForm
