'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(2, 'Category name is too short'),
})

type CategoryFormValues = z.infer<typeof schema>

export default function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true)
      await axios.post('http://localhost:8000/api/product/add-category', data)
      toast.success( 'Category added successfully!')
      reset()
    } catch (error) {
      console.error(error)
      toast.error(
        'Failed to add category.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto"
    >
      <Card className="shadow-xl border border-border">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Enter category name"
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading || isSubmitting} className="w-full">
              {loading ? 'Adding...' : 'Add Category'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
