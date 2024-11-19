import { useEffect, useState } from 'react'
import type { CartFormData, CartItem } from '../types/cart'
import { cartService } from '@services/cart.service'
import { AppError, handleError } from '@utils/error'
import { getCurrentDate } from '@utils/date'
import { toast } from '@pheralb/toast'
import { CART_STARTED_AT, CART_STORAGE, INIT_ERROR_STATUS } from '@utils/const'

function useCart() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AppError>(INIT_ERROR_STATUS)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storagedCart = localStorage.getItem(CART_STORAGE)
    return storagedCart ? JSON.parse(storagedCart) : []
  })
  const [startedAt, setStartedAt] = useState(() => {
    const storagedStartedAt = localStorage.getItem(CART_STARTED_AT)
    return storagedStartedAt ? JSON.parse(storagedStartedAt) : ''
  })

  useEffect(() => {
    if (!cartItems.length) return setStartedAt('')
    if (startedAt) return

    const newStartedAt = getCurrentDate()
    localStorage.setItem(CART_STARTED_AT, JSON.stringify(newStartedAt))
    setStartedAt(newStartedAt)
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cartItems))
  }, [cartItems])

  async function addToCart(formData: CartFormData) {
    setLoading(true)
    setError(INIT_ERROR_STATUS)

    try {
      const { data: newItem } = await cartService.getProductById(
        formData.productId
      )
      const formQuantity = Number(formData.quantity)
      if (!newItem) throw Error('El producto no existe')
      setCartItems((prev) => {
        const foundItem = prev.find((item) => item.id === newItem.id)
        if (foundItem) {
          return prev.map((item) => {
            if (item.id === foundItem.id) {
              const itemQuantity = item.quantity + formQuantity
              return {
                ...item,
                quantity: itemQuantity,
                totalPrice: item.price * itemQuantity,
              }
            }
            return item
          })
        }

        return [
          ...prev,
          {
            ...newItem,
            quantity: formQuantity,
            totalPrice: newItem.price * formQuantity,
          },
        ]
      })
      toast.success({
        text: `${Number(formData.quantity) > 1 ? `${formData.quantity} Products` : `${formData.quantity} Product`} Added to Cart`,
        description: `${newItem.title}`,
      })
    } catch (error) {
      setError(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  function updateQuantity(id: number, quantity: number) {
    setCartItems((prev) => {
      const foundItem = prev.find((item) => item.id === id)
      if (foundItem) {
        return prev.map((item) => {
          if (item.id === foundItem.id) {
            const itemQuantity = item.quantity + quantity
            return {
              ...item,
              quantity: itemQuantity,
              totalPrice: item.price * itemQuantity,
            }
          }
          return item
        })
      }

      return prev
    })
  }

  function removeFromCart(id: number) {
    const newCart = cartItems.filter((item) => item.id !== id)
    setCartItems(newCart)
  }

  function clearCart() {
    setCartItems([])
  }

  return {
    // Data
    cartItems,
    loading,
    error,
    startedAt,
    // Methods
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  }
}

export default useCart
