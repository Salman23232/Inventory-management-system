import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.js'
import productRouter from './routes/product.js'

const app = express()
app.use(cors({
    origin:['http://localhost:3000', 'https://inventory-management-system-kappa-three.vercel.app'],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/user', authRouter )
app.use('/api/product', productRouter)

const PORT = 8000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
