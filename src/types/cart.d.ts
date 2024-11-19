export interface Item {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Item {
  quantity: number
  totalPrice: number
}

export interface CartFormData {
  productId: string
  quantity: string
}
