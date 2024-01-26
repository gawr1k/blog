import { message } from 'antd'

const BASE_URL = 'https://blog.kata.academy/api/'

export async function getArticles(page, token = null) {
  const newPage = page || 1
  try {
    const offset = (newPage - 1) * 5
    const url = new URL('/api/articles', BASE_URL)
    url.searchParams.set('limit', 5)
    url.searchParams.set('offset', offset)
    const headers = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers.Authorization = `Token ${token}`
    }
    const response = await fetch(url, {
      headers,
    })
    if (!response.ok) {
      throw new Error(`getArticles Error: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    message.error(`Error in getArticles: ${error.message}`)
    throw error
  }
}

export async function getArticle(slug, token = null) {
  const url = new URL(`articles/${slug}`, BASE_URL)
  const headers = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Token ${token}`
  }
  const response = await fetch(url, {
    headers,
  })
  if (!response.ok) {
    throw new Error(`getArticle Error: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export async function postLoginUser(email, password) {
  try {
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
      throw new Error(`${response.status}`)
    }
    const data = await response.json()
    message.success('Authorization was successful!')
    return data
  } catch (error) {
    message.error(`Authentication failed: ${error.message}`)
    throw error
  }
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
        image: userData.image,
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
      throw new Error(errorData.errors.email || errorData.errors.username)
    }
    const data = await response.json()
    message.success('Registration successful!')
    return data
  } catch (error) {
    message.error(`Registration failed: email/username ${error.message}`)
    throw error
  }
}

export async function postFavorite(slug, token) {
  try {
    const url = new URL(`articles/${slug}/favorite`, BASE_URL)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`postFavorite Error: ${response.status}`)
    }
    const data = await response.json()
    return data.article
  } catch (error) {
    message.error('Произошла ошибка при лайке. Пожалуйста, попробуйте снова.')
    throw error
  }
}

export async function deleteFavorite(slug, token) {
  try {
    const url = new URL(`articles/${slug}/favorite`, BASE_URL)
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`deleteFavorite Error: ${response.status}`)
    }
    const data = await response.json()
    return data.article
  } catch (error) {
    message.error('Failed to delete favorite. Please try again.')
    throw error
  }
}

export async function deleteArticle(slug, token) {
  try {
    const url = `${BASE_URL}/articles/${slug}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`Ошибка при удалении статьи: ${response.status}`)
    }
    const data = await response.json()
    message.success('Успешно, статья удалена.')
    return data
  } catch (error) {
    message.success('Успешно, статья удалена.')
    throw error
  }
}

export async function getProfile(token) {
  try {
    const url = `${BASE_URL}/user`
    const headers = {
      Authorization: `Token ${token}`,
    }
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })
    if (!response.ok) {
      throw new Error(`Ошибка при получении профиля: ${response.status}`)
    }
    const data = await response.json()
    return data.user
  } catch (error) {
    message.error(`Ошибка в getProfile: ${error.message}`)
    throw error
  }
}

export async function updateArticle(jwtToken, articleData, slug) {
  try {
    const url = `${BASE_URL}/articles/${slug}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${jwtToken}`,
    }
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ article: articleData }),
    })
    if (!response.ok) {
      throw new Error(`updateArticle Error: ${response.status}`)
    }
    const data = await response.json()
    message.success('Seda artiklit on edukalt uuendatud')
    return data
  } catch (error) {
    message.error(`Error in updateArticle: ${error.message}`)
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
    message.success('Create article successful!')
    return responseData
  } catch (error) {
    message.error('Failed to create article. Please try again.')
    throw error
  }
}
