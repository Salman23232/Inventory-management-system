import axios from 'axios'

const API_URL = 'http://localhost:8000/api/product' // Your Express backend

// Get all categories
export const fetchCategories = async () => {
  const { data } = await axios.get(`${API_URL}/categories`)
  return data
}

// Get all products or filter by category
export const fetchProducts = async (categoryId?: number) => {
  const { data } = await axios.get(`${API_URL}/`, {
    params: categoryId ? { category_id:categoryId } : {},
  })
  return data
}


// Add a new product
export const addProduct = async (formData: FormData) => {
  const { data } = await axios.post(`${API_URL}/`, formData, {
    withCredentials:true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

// Delete a product
export const deleteProduct = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data
}
