import { Pagination, Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResultErr from '../ResultErr/ResultErr'
import { selectToken, selectStatus } from '../../store/slices/loginSlice'
import {
  fetchPosts,
  selectPosts,
  selectLoadingPosts,
  selectError,
  selectPage,
  setCurrentPage,
} from '../../store/slices/postsSlice'
import Post from '../Post/Post'

import style from './PostList.module.scss'

export default function PostList() {
  const loading = useSelector(selectLoadingPosts)
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const currentPage = useSelector(selectPage)
  const status = useSelector(selectStatus)
  const posts = useSelector(selectPosts)
  const error = useSelector(selectError)

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(fetchPosts({ page: currentPage, token }))
    }
  }, [currentPage, status, token, dispatch])

  let content

  if (loading) {
    content = (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  } else if (error) {
    content = <ResultErr error={error} />
  } else {
    content = (
      <>
        {posts.articles.map((post) => (
          <Post key={`${post.slug}-${post.createdAt}`} post={post} />
        ))}
        <div className={style.container__pagination}>
          <Pagination
            current={currentPage || 1}
            total={posts.articlesCount * 2}
            onChange={(page) => dispatch(setCurrentPage(page))}
          />
        </div>
      </>
    )
  }

  return content
}
