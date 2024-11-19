import useCart from '@hooks/useCart'
import { CartSearch } from './CartSearch'
import { CartList } from './CartList'

export default function Cart() {
  const {
    cartItems,
    loading,
    startedAt,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  } = useCart()

  return (
    <section className="border rounded-md p-5 shadow-xl ">
      <h1 className="text-3xl font-semibold">
        Tienda -{' '}
        <a
          href="https://acortar.link/RzE6K"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          El topo
        </a>
      </h1>

      <CartSearch onSubmit={addToCart} loading={loading} />

      <CartList
        clearCart={clearCart}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        startedAt={startedAt}
        updateQuantity={updateQuantity}
      />
    </section>
  )
}
