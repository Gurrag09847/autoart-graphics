import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Image } from "types"
import { IMAGE_PRICE } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calcImagePrice = (images: Image[]) => {
  console.log(images)
  if (images && images?.length === 0) return 0
  return ((images.length) * IMAGE_PRICE) - IMAGE_PRICE
}
