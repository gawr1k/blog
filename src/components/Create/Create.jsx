import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { PATH_POST } from '../../routes'
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
  const titleText = 'Create new article'
  useEffect(() => {
    if (status === 'succeeded') {
      navigate(PATH_POST(slug))
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
      titleText={titleText}
    />
  )
}

export default Create
