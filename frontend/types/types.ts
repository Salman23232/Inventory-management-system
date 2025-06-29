export interface Category {
  id: number
  name: string
}

export interface Product {
  id: string
  name: string
  price: number
  image?: string
  categoryId: number
  category: Category
}
