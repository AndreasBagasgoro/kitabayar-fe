"use client"

import PopularCard from "../../popular_card/page"
import { useState } from "react"

// Interface langsung di file ini
interface PopularItem {
  id: number
  name: string
  price: string
  image: string | null
}

const Popular = () => {
  const [popularItems] = useState<PopularItem[]>([
    {
      id: 1,
      name: "Margherita Pizza",
      price: "18.99",
      image: null,
    },
    {
      id: 2,
      name: "Chicken Burger",
      price: "12.99",
      image: null,
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: "9.99",
      image: null,
    },
  ])

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Popular Items
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {popularItems.map((item) => (
          <PopularCard key={item.id} item={item} />
        ))}
      </div>

      {/* View Full Menu Button */}
      <div className="text-center">
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors text-base font-medium"
        >
          View Full Menu
        </button>
      </div>
    </div>
  )
}

export default Popular
