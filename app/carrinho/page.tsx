import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import CartContent from '@/app/_components/cart-content'

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CartContent />
      </main>
      <Footer />
    </div>
  )
}
