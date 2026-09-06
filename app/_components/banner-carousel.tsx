'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from './ui/button'

const slides = [
  {
    id: 1,
    image: '/Banner.png',
    title: 'Floresca Floricultura',
    subtitle: 'As melhores flores da região',
  },
  {
    id: 2,
    image: '/produtos/01.avif',
    title: 'Buquê de Rosas',
    subtitle: 'R$ 50,00 - Perfeito para presentear',
  },
  {
    id: 3,
    image: '/produtos/04.avif',
    title: 'Cesta com Flores',
    subtitle: 'R$ 80,00 - Promoção especial',
  },
  {
    id: 4,
    image: '/produtos/07.avif',
    title: 'Mix de Flores',
    subtitle: 'R$ 70,00 - Novidade no estoque',
  },
]

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <div className="relative mt-4 overflow-hidden rounded-xl sm:mt-6 sm:rounded-2xl">
      <div className="relative aspect-[3/1] sm:aspect-[3/1]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white sm:bottom-6 sm:left-6">
              <h3 className="text-lg font-bold sm:text-2xl">{slide.title}</h3>
              <p className="text-xs sm:text-sm">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 text-black hover:bg-white sm:left-3"
        onClick={prev}
      >
        <ChevronLeftIcon className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 text-black hover:bg-white sm:right-3"
        onClick={next}
      >
        <ChevronRightIcon className="size-5" />
      </Button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`size-2 rounded-full transition-all sm:size-2.5 ${
              index === current ? 'w-4 bg-white sm:w-5' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerCarousel
