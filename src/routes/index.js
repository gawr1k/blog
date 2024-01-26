export const PATH_HOME = '/'
export const PATH_ARTICLE = '/articles'
export const PATH_SLUG = '/articles/:slug'
export const PATH_SLUG_EDIT = '/articles/:slug/edit'
export const PATH_SIGN_IN = '/sign-in'
export const PATH_SIGN_UP = '/sign-up'
export const PATH_PROFILE = '/profile'
export const PATH_NEW_ARTICLE = '/new-article'
export const NOT_FOUND = '*'
export const PATH_POST = (slug) => `/articles/${slug}`
export const HANDLE_EDIT_CLICK = (slug, navigate) => {
  navigate(`/articles/${slug}/edit`)
}
