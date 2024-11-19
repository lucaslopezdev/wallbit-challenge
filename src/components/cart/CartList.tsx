import { Button } from '@components/common/Button'
import { CartItem } from '../../types/cart'
import { MdDelete, MdRemove, MdAdd } from 'react-icons/md'

interface Props {
  cartItems: CartItem[]
  startedAt: string
  removeFromCart: (id: number) => void
  clearCart: () => void
  updateQuantity: (id: number, quantity: number) => void
}

export const CartList = ({
  cartItems,
  startedAt,
  removeFromCart,
  clearCart,
  updateQuantity,
}: Props) => {
  const totalItems = cartItems.reduce((acc, cur) => cur.quantity + acc, 0)
  const totalPrice = cartItems.reduce((acc, cur) => cur.totalPrice + acc, 0)

  if (!cartItems.length) {
    return (
      <>
        <h3 className="my-3">Carrito de compra</h3>

        <p className="my-5 text-center text-pretty max-w-lg mx-auto">
          No hay productos en el carro aun, prueba agregando arriba con su id y
          la cantidad que deseas ingresar
        </p>
      </>
    )
  }

  return (
    <>
      <h3 className="my-3">
        Carrito de compra{' '}
        <span>{cartItems.length ? `- Iniciado ${startedAt}` : ''}</span>
      </h3>

      <article className="max-h-[500px] overflow-auto ">
        <table className="w-full">
          <thead className="h-10 [&>th]:font-semibold [&>th]:px-2 text-sm">
            <th>Cantidad</th>
            <th className="text-start">Nombre</th>
            <th>Precio Unidad</th>
            <th>Precio Total</th>
            <th>Imagen</th>
            <th>Quitar</th>
          </thead>
          <tbody className="border">
            {cartItems.map(
              ({ title, price, id, quantity, totalPrice, image }) => (
                <tr
                  key={id}
                  className="h-20 [&>td]:px-2 text-center [&>td]:border-y "
                >
                  <td className="p-2 ">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        disabled={quantity <= 1}
                        onClick={() => updateQuantity(id, -1)}
                        className={`${quantity <= 1 ? 'text-gray-400' : ''}`}
                      >
                        <MdRemove />
                      </button>
                      <span className="w-7 text-center">{quantity}</span>
                      <button onClick={() => updateQuantity(id, 1)}>
                        <MdAdd />
                      </button>
                    </div>
                  </td>
                  <td className="text-start text-balance max-w-lg text-ellipsis">
                    {title}
                  </td>
                  <td>${price}</td>
                  <td>${totalPrice.toFixed(2)}</td>
                  <td>
                    <img
                      src={image}
                      alt={title}
                      className="p-1 mx-auto my-2 size-12 object-contain bg-white rounded-md"
                    />
                  </td>
                  <td>
                    <button onClick={() => removeFromCart(id)}>
                      <MdDelete
                        className="text-negative rounded-md hover:scale-110 transition-all duration-150"
                        size={20}
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </article>
      <div className="flex justify-between items-center mt-5">
        <div>
          <h5 className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </h5>
          <span>Cantidad de productos: {totalItems}</span>
        </div>
        <Button color="#d22e2f" onClick={clearCart}>
          Limpiar Carrito
        </Button>
      </div>
    </>
  )
}
