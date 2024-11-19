import { cartService } from '@services/cart.service'
import { Item } from '../types/cart'

import { useState } from 'react'
import { handleError } from '@utils/error'
import { INIT_ERROR_STATUS } from '@utils/const'

const useProducts = () => {
  const [products, setProducts] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(INIT_ERROR_STATUS)

  async function getProducts() {
    setLoading(true)

    try {
      const { data } = await cartService.getAllProducts()
      setProducts(data)
    } catch (error) {
      setError(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  return {
    // Data
    products,
    loading,
    error,
    // Methods
    getProducts,
  }
}

export default useProducts
