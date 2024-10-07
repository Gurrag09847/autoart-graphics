import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Image } from "types"
import { BASE_PRICE, IMAGE_PRICE } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calcImagePrice = (images: Image[]) => {
  if (images && images?.length === 0) return 0
  const newImages = images.slice()
  return (newImages.length || 1) * IMAGE_PRICE
}
