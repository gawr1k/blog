const BASE_URL = 'https://blog.kata.academy/api/'

export default async function getArticles(page = 1, limit = 5) {
  const offset = (page - 1) * limit
  const url = new URL('articles', BASE_URL)
  url.searchParams.set('limit', limit)
  url.searchParams.set('offset', offset)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Error fetching articles: ${response.status}`)
  }
  const data = await response.json()
  return data
}
