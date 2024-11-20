import { Button } from '@components/common/Button'
import { CartItem } from '../../types/cart'
import { MdDelete, MdRemove, MdAdd } from 'react-icons/md'
import { FormEvent, useEffect, useState } from 'react'
import 'photoswipe/style.css'
import { Discounts, CART_DISCOUNT, CART_CODE } from '@/utils/const'
import { toast } from '@pheralb/toast'

interface Props {
  cartItems: CartItem[]
  startedAt: string
  removeFromCart: (id: number) => void
  clearCart: () => void
  updateQuantity: (id: number, quantity: number) => void
}

type DiscountCode = keyof typeof Discounts

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
  const [code, setCode] = useState<DiscountCode | ''>(() => {
    const storagedCode = localStorage.getItem(CART_CODE)
    return storagedCode ? JSON.parse(storagedCode) : ''
  })
  const [discount, setDiscount] = useState(() => {
    const storagedDiscount = localStorage.getItem(CART_DISCOUNT)
    return storagedDiscount ? JSON.parse(storagedDiscount) : 0
  })

  const totalItems = cartItems.reduce((acc, cur) => cur.quantity + acc, 0)
  const totalPrice = cartItems.reduce((acc, cur) => cur.totalPrice + acc, 0)

  const handleCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (code !== '' && Object.keys(Discounts).includes(code)) {
      setDiscount(Discounts[code])
      localStorage.setItem(CART_CODE, JSON.stringify(code))
    } else {
      toast.error({
        text: 'Invalid Code!',
        description:
          'The code you entered does not exist or is no longer available',
      })
      setCode('')
    }
  }

  const codeValidate = () => {
    return code ? false : true
  }

  const removeCode = () => {
    setCode('')
    setDiscount(0)
  }

  useEffect(() => {
    localStorage.setItem(CART_DISCOUNT, JSON.stringify(discount))
    localStorage.setItem(CART_CODE, JSON.stringify(code))
    if (discount > 0) {
      toast.success({
        text: 'Discount Applied!',
        description: `You got a ${discount}% discount`,
      })
    }
  }, [discount])

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
        <img
          src="cart-empty.webp"
          alt="Carrito vacio"
          className="mx-auto size-40"
        />
      </>
    )
  }

  return (
    <>
      <div className=" flex justify-between">
        <h3 className="my-3">
          Carrito de compra{' '}
          <span>{cartItems.length ? `- Iniciado ${startedAt}` : ''}</span>
        </h3>
        <Button color="#d22e2f" onClick={clearCart}>
          Limpiar Carrito
        </Button>
      </div>

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
          <form onSubmit={handleCode} className="flex gap-3">
            <input
              type="text"
              className="px-4 py-2 border rounded-md w-32"
              value={code}
              onChange={(event) => setCode(event.target.value as DiscountCode)}
              name="quantity"
              readOnly={discount}
              max={999}
              min={1}
              id="quantity"
              placeholder="Código"
            />
            {discount ? (
              <Button color="#d22e2f" onClick={removeCode}>
                Eliminar código
              </Button>
            ) : (
              <Button disabled={codeValidate} color="#0d99ff">
                Aplicar código
              </Button>
            )}
          </form>
        </div>
        <div>
          <div className="flex justify-between gap-2 items-end">
            <span className="text-sm font-bold text-green-600">
              {discount ? `${discount + '% OFF'}` : ''}
            </span>
            <h5
              className={`text-xl text-right font-semibold ${discount ? 'line-through text-neutral-500 opacity-50' : ''}`}
            >
              Total: ${totalPrice.toFixed(2)}
            </h5>
          </div>
          {discount ? (
            <div className="flex justify-between gap-2 items-end">
              <span className="text-sm font-bold text-green-600">
                ${(Number(totalPrice.toFixed(2)) * discount) / 100}
              </span>
              <h5 className="text-xl text-right font-semibold">
                Total: $
                {(totalPrice - (totalPrice * discount) / 100).toFixed(2)}
              </h5>
            </div>
          ) : (
            ''
          )}
          <span>Cantidad de productos: {totalItems}</span>
        </div>
      </div>
    </>
  )
}
