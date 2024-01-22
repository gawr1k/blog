import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  updateArticleAsync,
  selectArticle,
  selectStatusArticle,
  resetZeroArticleState,
} from '../../store/slices/articleSlice'
import CreateEditArticleForm from '../CreateEditArticleForm/CreateEditArticleForm'

function Edit() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const titleText = 'Edit article'

  const status = useSelector(selectStatusArticle)
  const article = useSelector(selectArticle)
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
      asyncEditCreatArticleFunc={updateArticleAsync}
      slug={slug}
      article={article}
      titleText={titleText}
    />
  )
}

export default Edit
