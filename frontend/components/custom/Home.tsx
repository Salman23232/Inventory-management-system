import Link from 'next/link'
import { Github, Mail, Twitter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


import { motion } from 'framer-motion'
import ViewByCategory from '@/components/custom/ViewByCategory'
import { ShoppingCart, PlusCircle,} from 'lucide-react'

const sections = [
  {
    title: 'Add Product',
    description: 'Upload a new product with image, price, and category.',
    href: '/add-product',
    icon: <PlusCircle className="h-8 w-8 text-primary" />,
  },
  {
    title: 'View Products',
    description: 'See all products and filter by category.',
    href: '/products',
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
  }

]
import React from 'react'

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-indigo-100 to-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold tracking-tight text-gray-900"
          >
            🧾 Inventory Management System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Effortlessly manage your product inventory with category filters, quick add, and secure login. Built with Express, MySQL, and Next.js.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild size="lg">
              <Link href="/products">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <ViewByCategory/>
      {/* Features Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
          {sections.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Link href={item.href}>
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {item.icon}
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
     
    <footer className="bg-black text-white border-t border-gray-800 shadow-inner mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Brand Info */}
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold tracking-wide">InventoryApp</h2>
          <p className="text-sm text-gray-400">Efficiently manage your products and categories.</p>
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Salman. All rights reserved.</p>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary transition-colors duration-200">Products</Link>
            </li>
            <li>
              <Link href="/add-product" className="hover:text-primary transition-colors duration-200">Add Product</Link>
            </li>
            <li>
              <Link href="/auth" className="hover:text-primary transition-colors duration-200">Login / Signup</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-4 text-gray-400">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <Github className="h-5 w-5" />
          </a>
          <a href="mailto:support@example.com" className="hover:text-white transition">
            <Mail className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>

    </main>
  )
}

export default Home


