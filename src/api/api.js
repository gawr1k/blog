/* eslint-disable default-param-last */
const BASE_URL = 'https://blog.kata.academy/api/'

export async function getArticles(page = 1, limit = 5) {
  const offset = (page - 1) * limit
  const url = new URL('articles', BASE_URL)
  url.searchParams.set('limit', limit)
  url.searchParams.set('offset', offset)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`getArticles Error: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export async function getArticle(slug) {
  const url = new URL(`articles/${slug}`, BASE_URL)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`getArticle Error: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export async function postLoginUser(
  email = 'gasimmurasov@gmail.com',
  password = 'gasimmurasov@gmail.com'
) {
  const url = new URL('users/login', BASE_URL)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  })
  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.status}`)
  }
  const data = await response.json()
  return data
}
