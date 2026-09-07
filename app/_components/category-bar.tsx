import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const categories = [
  { name: 'Arranjos', slug: 'ARRANJOS', icon: '/svg/arranjo.svg' },
  { name: 'Bouquets', slug: 'BUQUÊS', icon: '/svg/bouquet.svg' },
  { name: 'Cestas', slug: 'CESTAS', icon: '/svg/cesta.svg' },
  { name: 'Girassóis', slug: 'GIRASSÓIS', icon: '/svg/girassol.svg' },
  { name: 'Mix', slug: 'MIX', icon: '/svg/mix.svg' },
  { name: 'Orquídeas', slug: 'ORQUÍDEAS', icon: '/svg/orquidia.svg' },
  { name: 'Ramos', slug: 'RAMOS', icon: '/svg/ramo.svg' },
]

export default function CategoryBar() {
  return (
    <div className="mt-6 flex items-center gap-2 overflow-x-auto sm:mt-8">
      {categories.map((cat) => (
        <Link key={cat.name} href={`/categoria/${cat.slug}`}>
          <Button className="shrink-0 gap-2" variant="secondary">
            <Image src={cat.icon} alt={cat.name} width={16} height={16} />
            {cat.name}
          </Button>
        </Link>
      ))}
    </div>
  )
}
