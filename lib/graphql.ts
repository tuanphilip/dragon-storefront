const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL || 'https://dragon.cool.robosoft.site/saleor/graphql/'
const SALEOR_ADMIN_TOKEN = process.env.SALEOR_ADMIN_TOKEN || ''

export async function saleorQuery<T = any>(
  query: string, 
  variables?: Record<string, any>
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  
  if (SALEOR_ADMIN_TOKEN) {
    const token = SALEOR_ADMIN_TOKEN
    const bearer = 'Bearer '.concat(token)
    headers['Authorization'] = bearer
  }
  
  const res = await fetch(SALEOR_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })
  
  const json = await res.json()
  
  if (json.errors) {
    console.error('GraphQL errors:', json.errors)
    throw new Error(json.errors[0]?.message || 'GraphQL error')
  }
  
  return json.data as T
}
