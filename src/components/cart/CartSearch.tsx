import { Button } from '@components/common/Button'
import { CartFormData } from '../../types/cart'
import { FormEvent, useState } from 'react'
import { LoaderSpinner } from '@components/common/LoaderSpinner'
import { INITIAL_FORM_DATA } from '@utils/const'

interface Props {
  onSubmit: (formData: CartFormData) => Promise<void>
  loading: boolean
}

export const CartSearch = ({ onSubmit, loading }: Props) => {
  const [formData, setFormData] = useState<CartFormData>(INITIAL_FORM_DATA)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(formData)
    setFormData(INITIAL_FORM_DATA)
  }

  function validateForm() {
    return !Number(formData.productId) || !Number(formData.quantity)
      ? true
      : false
  }

  return (
    <section className="my-5">
      <h3>Agrega los productos al carro de compras</h3>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 my-3 flex-col sm:flex-row"
      >
        <input
          type="number"
          className="px-4 py-2 border rounded-md w-32"
          value={formData.quantity}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, quantity: event.target.value }))
          }
          name="quantity"
          max={999}
          min={1}
          id="quantity"
          placeholder="Cantidad"
        />
        <input
          type="number"
          className="px-4 py-2 border rounded-md w-40"
          value={formData.productId}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, productId: event.target.value }))
          }
          name="productId"
          id="productId"
          min={1}
          placeholder="ID del Producto"
        />
        <Button loading={loading} disabled={validateForm} color="#0d99ff">
          {loading ? <LoaderSpinner /> : 'Agregar'}
        </Button>
      </form>
    </section>
  )
}
