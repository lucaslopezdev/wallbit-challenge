import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import ThisIsNotAnEasterEgg from '@components/ThisIsNotAnEasterEgg'
import Cart from '@components/cart/Cart'
import ProductsLists from '@components/products/ProductsLists'

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container max-w-5xl mx-auto px-2">
        <Cart />
        <p title="Type 'tuki'" className="opacity-50 text-sm pt-2 pl-1">
          Hover me
        </p>
        <ProductsLists />
        <ThisIsNotAnEasterEgg />
      </main>
      <Footer />
    </div>
  )
}

export default App
