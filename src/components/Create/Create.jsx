import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  createArticleAsync,
  selectStatusArticle,
  selectSlugArticle,
  resetZeroArticleState,
} from '../../store/slices/articleSlice'
import CreateEditArticleForm from '../CreateEditArticleForm/CreateEditArticleForm'

function Create() {
  const navigate = useNavigate()
  const status = useSelector(selectStatusArticle)
  const slug = useSelector(selectSlugArticle)
  const dispatch = useDispatch()
  useEffect(() => {
    if (status === 'succeeded') {
      navigate(`/articles/${slug}`)
    }
  })

  useEffect(
    () => () => {
      dispatch(resetZeroArticleState())
    },
    [dispatch]
  )

  return (
    <CreateEditArticleForm
      asyncEditCreatArticleFunc={createArticleAsync}
      article={{}}
      slug={{}}
    />
  )
}

export default Create
