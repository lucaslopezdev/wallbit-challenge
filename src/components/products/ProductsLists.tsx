import useProducts from '@hooks/useProducts'
import useCart from '@/hooks/useCart'
import { useEffect } from 'react'
import { Button } from '../common/Button'
import StarRating from './StarRating'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useState } from 'react'

const ProductsLists = () => {
  const { products, loading, getProducts } = useProducts()
  const { loading: loadingCart, addToCart } = useCart()
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    getProducts()
  }, [])

  const scrollNext = () => {
    if (api) {
      api.scrollNext()
    }
  }

  const scrollPrev = () => {
    if (api) {
      api.scrollPrev()
    }
  }

  if (loading) {
    return <div className="text-center py-44">Cargando productos...</div>
  }

  return (
    <section className="my-5">
      <h3 className="text-xl mb-3 font-semibold">Todos los productos</h3>
      <Carousel
        setApi={setApi}
        className="w-full overflow-hidden lg:overflow-visible"
      >
        <CarouselContent className="-ml-4">
          {products.map(({ title, id, image, description, price, rating }) => (
            <CarouselItem key={id} className="pl-4 md:basis-1/3 lg:basis-1/4">
              <article className="border rounded-md h-full flex flex-col">
                <img
                  src={image}
                  alt={title}
                  className="h-40 w-full object-contain bg-white rounded-t-md p-2 mx-auto"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 truncate">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {description}
                    </p>
                  </div>
                  <div>
                    <StarRating rating={rating.rate} />
                    <p className="text-sm text-gray-500 mt-1">
                      ({rating.count} reseñas)
                    </p>
                    <p className="text-lg font-bold mt-2">
                      ${price.toFixed(2)}
                    </p>
                    <Button
                      className="w-full mt-4"
                      disabled={() => loadingCart}
                      onClick={() =>
                        addToCart({ productId: id.toString(), quantity: '1' })
                      }
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={() => scrollPrev()} />
        <CarouselNext onClick={() => scrollNext()} />
      </Carousel>
    </section>
  )
}

export default ProductsLists
