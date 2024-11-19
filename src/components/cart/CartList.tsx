import { Button } from '@components/common/Button'
import { CartItem } from '../../types/cart'
import { MdDelete, MdRemove, MdAdd } from 'react-icons/md'
import { useEffect, useState } from 'react'
import 'photoswipe/style.css'

interface Props {
  cartItems: CartItem[]
  startedAt: string
  removeFromCart: (id: number) => void
  clearCart: () => void
  updateQuantity: (id: number, quantity: number) => void
}

interface ImageDimensions {
  [key: string]: { width: number; height: number }
}

export const CartList = ({
  cartItems,
  startedAt,
  removeFromCart,
  clearCart,
  updateQuantity,
}: Props) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({})

  const totalItems = cartItems.reduce((acc, cur) => cur.quantity + acc, 0)
  const totalPrice = cartItems.reduce((acc, cur) => cur.totalPrice + acc, 0)

  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: ImageDimensions = {}
      for (const item of cartItems) {
        if (!imageDimensions[item.image]) {
          const img = new Image()
          img.src = item.image
          await new Promise((resolve) => {
            img.onload = () => {
              dimensions[item.image] = {
                width: img.naturalWidth * 0.7,
                height: img.naturalHeight * 0.7,
              }
              resolve(null)
            }
          })
        }
      }
      setImageDimensions((prev) => ({ ...prev, ...dimensions }))
    }

    loadImageDimensions()
  }, [cartItems])

  useEffect(() => {
    const init = async () => {
      const module = await import('photoswipe/lightbox')
      const PhotoSwipeLightbox = module.default
      const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
      })
      lightbox.init()
    }
    init()
  }, [])

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

      <article className="max-h-[500px] overflow-auto">
        <table className="w-full">
          <thead className="h-10 bg-[var(--background-color)] [&>th]:font-semibold sticky top-0 [&>th]:px-2 text-sm">
            <th>Cantidad</th>
            <th className="text-start">Nombre</th>
            <th>Precio Unidad</th>
            <th>Precio Total</th>
            <th>Imagen</th>
            <th>Quitar</th>
          </thead>
          <tbody className="border" id="gallery">
            {cartItems.map(
              ({ title, price, id, quantity, totalPrice, image }) => (
                <tr
                  key={id}
                  className="h-20 [&>td]:px-2 text-center [&>td]:border-y"
                >
                  <td className="p-2">
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
                    <a
                      href={image}
                      data-pswp-width={imageDimensions[image]?.width || 0}
                      data-pswp-height={imageDimensions[image]?.height || 0}
                      data-cropped="true"
                      className="block p-1 mx-auto my-2 w-12 h-12 bg-white rounded-md"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </a>
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
