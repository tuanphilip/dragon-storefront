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
  pricing?: {
    priceRange?: {
      start?: { net: { amount: number; currency: string } }
      stop?: { net: { amount: number; currency: string } }
    }
  }
  variants: ProductVariant[]
  attributes: ProductAttribute[]
}

export interface ProductMedia {
  id: string
  url: string
  alt: string
  type: string
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
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
