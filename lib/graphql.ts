const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL || 'https://dragon.cool.robosoft.site/saleor/graphql/'

export async function saleorQuery<T = any>(
  query: string, 
  variables?: Record<string, any>
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  
  // Public API — no auth needed for products/categories/pages
  // Admin token is NOT sent from storefront
  
  const res = await fetch(SALEOR_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })
  
  const json = await res.json()
  
  if (json.errors) {
    console.error('GraphQL errors:', json.errors.map((e: any) => e.message).join(' | '))
    throw new Error(json.errors[0]?.message || 'GraphQL error')
  }
  
  return json.data as T
}
