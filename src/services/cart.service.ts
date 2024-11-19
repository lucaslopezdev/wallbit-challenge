import { Item } from '../types/cart'
import axios from 'axios'

const cartApi = axios.create({
  baseURL: 'https://fakestoreapi.com/',
})

export const cartService = {
  async getProductById(id: string) {
    return await cartApi.get<Item>(`/products/${id}`)
  },

  async getAllProducts() {
    return await cartApi.get<Item[]>('/products')
  },
}
