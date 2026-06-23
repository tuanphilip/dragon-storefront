export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  media: ProductMedia[]
  category?: {
    id: string
    name: string
    slug: string
  }
  channelListings: ProductChannelListing[]
  variants: ProductVariant[]
  attributes: ProductAttribute[]
}

export interface ProductMedia {
  id: string
  url: string
  alt: string
  type: string
}

export interface ProductChannelListing {
  id: string
  channel: { slug: string }
  isPublished: boolean
  isAvailableForPurchase: boolean
  pricing?: {
    priceRange?: {
      start?: { net: { amount: number } }
      stop?: { net: { amount: number } }
    }
  }
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  pricing?: {
    price?: { gross: { amount: number; currency: string } }
  }
  channelListings?: {
    price: { amount: number; currency: string }
  }[]
}

export interface ProductAttribute {
  attribute: { id: string; name: string }
  values?: { name: string }[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  backgroundImage?: { url: string }
  children?: Category[]
  products?: { totalCount: number }
}

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  seoTitle?: string
  seoDescription?: string
}
