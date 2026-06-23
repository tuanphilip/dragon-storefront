import { saleorQuery } from './graphql'
import type { Product, Category, Page } from './types'

const PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 50, channel: "default-channel") {
      edges {
        node {
          id
          name
          slug
          description
          seoTitle
          seoDescription
          media {
            id
            url
            alt
            type
          }
          pricing {
            priceRange {
              start { net { amount currency } }
              stop { net { amount currency } }
            }
          }
          category { id name slug }
          attributes {
            attribute { id name }
            values { name }
          }
          variants {
            id
            name
            sku
          }
        }
      }
    }
  }
`

const PRODUCT_BY_SLUG = `
  query GetProduct($slug: String!) {
    product(slug: $slug, channel: "default-channel") {
      id
      name
      slug
      description
      seoTitle
      seoDescription
      media { id url alt type }
      pricing {
        priceRange {
          start { net { amount currency } }
          stop { net { amount currency } }
        }
      }
      category { id name slug }
      attributes {
        attribute { id name }
        values { name }
      }
      variants {
        id
        name
        sku
      }
    }
  }
`

const CATEGORIES_QUERY = `
  query GetCategories {
    categories(first: 50) {
      edges {
        node {
          id
          name
          slug
          children(first: 20) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
          products(channel: "default-channel") {
            totalCount
          }
        }
      }
    }
  }
`

const PAGES_QUERY = `
  query GetPages {
    pages(first: 10) {
      edges {
        node {
          id
          title
          slug
          content
          seoTitle
          seoDescription
        }
      }
    }
  }
`

export async function getProducts(): Promise<Product[]> {
  const data = await saleorQuery<{ products: { edges: { node: Product }[] } }>(PRODUCTS_QUERY)
  const products = data.products.edges.map(e => e.node)
  // Fix media URLs from internal localhost to public
  return fixMediaUrls(products)
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const data = await saleorQuery<{ product: Product | null }>(PRODUCT_BY_SLUG, { slug })
    if (!data.product) return null
    return fixMediaUrls([data.product])[0]
  } catch {
    return null
  }
}

/** Transform media URLs from internal localhost to public */
function fixMediaUrls(products: Product[]): Product[] {
  const baseUrl = 'https://dragon.cool.robosoft.site/saleor'
  return products.map(p => ({
    ...p,
    media: p.media?.map(m => ({
      ...m,
      url: m.url.replace('http://localhost:8000', baseUrl),
    })) || [],
  }))
}

export async function getCategories(): Promise<Category[]> {
  const data = await saleorQuery<{ categories: { edges: { node: Category }[] } }>(CATEGORIES_QUERY)
  return data.categories.edges.map(e => {
    const node = e.node
    // Flatten children from connection format
    if (node.children && 'edges' in (node.children as any)) {
      (node as any).children = (node.children as any).edges.map((ce: any) => ce.node)
    }
    return node
  })
}

export async function getPages(): Promise<Page[]> {
  const data = await saleorQuery<{ pages: { edges: { node: Page }[] } }>(PAGES_QUERY)
  return data.pages.edges.map(e => e.node)
}
