import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import FavoritesContent from '@/app/_components/favorites-content'

export default function FavoritesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FavoritesContent />
      </main>
      <Footer />
    </div>
  )
}
