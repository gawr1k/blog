import { message } from 'antd'

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

export async function postLoginUser(email, password) {
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

export async function putUserProfile(userData) {
  const url = new URL('user', BASE_URL)
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`,
    },
    body: JSON.stringify({
      user: {
        email: userData.email,
        username: userData.username,
        password: userData.password,
        avatarURL: userData.avatarURL,
      },
    }),
  })
  if (!response.ok) {
    throw new Error(`Editing profile failed: ${response.status}`)
  }
  const responseData = await response.json()
  return responseData
}

export async function postRegisterUser(userData) {
  try {
    const url = new URL('users', BASE_URL)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.errors.body[0])
    }

    const data = await response.json()
    message.success('Registration successful!')
    return data
  } catch (error) {
    message.error(`Registration failed: ${error.message}`)
    throw error
  }
}
export async function postCreateArticle(jwtToken, articleData) {
  const url = new URL('articles', BASE_URL)
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  }
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ article: articleData }),
  }
  try {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error(`createArticle Error: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    message.error('Failed to create article. Please try again.')
    throw error
  }
}
