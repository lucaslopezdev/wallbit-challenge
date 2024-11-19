import { createContext, useContext } from 'react'
import useCart from '@hooks/useCart.ts'

const CartContext = createContext<ReturnType<typeof useCart> | undefined>(
  undefined
)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useCart()
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
