import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import protect from '../middleware/protect.js'
import dotenv from 'dotenv'
dotenv.config({})

const prisma = new PrismaClient()
const authRouter = express.Router()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '7d'

//  Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

//  Generate Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

//  SIGNUP
authRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    const token = generateToken(user.id)
    res.cookie('token', token, cookieOptions)

    res.status(201).json({ message: 'Signup successful', user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//  LOGIN
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' })

    const token = generateToken(user.id)
    res.cookie('token', token, cookieOptions)

    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//  LOGOUT
authRouter.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully' })
})

//  GET CURRENT USER (Protected)
authRouter.get('/me', protect, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) return res.status(404).json({ message: 'User not found' })

  res.status(200).json({ id: user.id, name: user.name, email: user.email })
})

export default authRouter
