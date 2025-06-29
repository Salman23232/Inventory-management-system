'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { fetchCategories } from '@/lib/api' // Update this path to your axios logic

type Category = {
  id: number
  name: string
}

export default function ViewByCategory() {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error)
  }, [])

  if (!categories) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <section className="py-12 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">View by Category</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={() => router.push(`/products?category_id=${category.id}`)}
              className="cursor-pointer"
            >
              <Card className="h-full bg-white dark:bg-black hover:shadow-lg transition-all duration-300 border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Explore products in {category.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
