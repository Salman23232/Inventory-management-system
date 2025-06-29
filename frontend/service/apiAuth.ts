import axios from 'axios'

const API_URL = 'http://localhost:8000/api/user'

export const signup = async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/signup`, data, { withCredentials: true })
  return res.data
}

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/login`, data, { withCredentials: true })
  return res.data
}

export const logout = async () => {
  const res = await axios.get(`${API_URL}/logout`, { withCredentials: true })
  return res.data
}

export const getCurrentUser = async () => {
  const res = await axios.get(`${API_URL}/me`, { withCredentials: true })
  return res.data
}
