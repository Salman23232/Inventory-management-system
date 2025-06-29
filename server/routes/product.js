import express from 'express'
import { PrismaClient } from '@prisma/client'
import protect from '../middleware/protect.js'
import upload from '../middleware/upload.js'

const prisma = new PrismaClient()
const productRouter = express.Router()

// GET /categories – Get all categories
productRouter.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch categories' })
  }
})

productRouter.post('/add-category', async (req, res) => {
  try {
    const {name} = req.body
    const categories = await prisma.category.create({
        data:{
            name
        }
    })
    res.json(categories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch categories' })
  }
})

// GET /products – Get all products (with category info), optional filter by category_id
productRouter.get('/', async (req, res) => {
  try {
    const { category_id } = req.query

    const products = await prisma.product.findMany({
      where: category_id
        ? { categoryId: Number(category_id) }
        : undefined,
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})



// POST /products – Add a new product
productRouter.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, price, categoryId } = req.body
    const image = req.file?.path

    // Validate required fields
    if (!name || !price || !image || !categoryId) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        image,
        categoryId: Number(categoryId),
        userId: req.userId, // ✅ this is all you need
      },
    })

    res.status(201).json({ message: 'Product created', product })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create product' })
  }
})


// DELETE /products/:id – Delete a product
productRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id },
    })

    res.json({ message: 'Product deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete product' })
  }
})

export default productRouter
