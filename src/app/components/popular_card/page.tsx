"use client"

import { FC } from "react"
import { ImageIcon } from "lucide-react"

// Interface langsung di file ini
interface PopularItem {
  id: number
  name: string
  price: string
  image: string | null
}

interface PopularCardProps {
  item: PopularItem
  onClick?: (item: PopularItem) => void
}

const PopularCard: FC<PopularCardProps> = ({ item, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 h-64 w-full"
      onClick={() => onClick?.(item)}
    >
      {/* Image Container */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon className="w-12 h-12 text-gray-400" />
        )}
      </div>

      {/* Content */}
      <div className="p-3 h-16 flex flex-col justify-between">
        <h3 className="font-semibold text-gray-900 text-base leading-tight">
          {item.name}
        </h3>
        <p className="text-orange-500 font-bold text-lg">${item.price}</p>
      </div>
    </div>
  )
}

export default PopularCard
