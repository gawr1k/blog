import { Pagination, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResultErr from '../ResultErr/ResultErr.jsx'
import {
  fetchPosts,
  selectPosts,
  selectLoadingPosts,
  selectError,
} from '../../store/slices/postsSlice.js'
import Post from '../Post/Post.jsx'

import style from './PostList.module.scss'

export default function PostList() {
  const { token } = useSelector((state) => state.user.user)
  const { status } = useSelector((state) => state.user)
  const [currentPage, setCurrentPage] = useState(1)
  const loading = useSelector(selectLoadingPosts)
  const dispatch = useDispatch()
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
            current={currentPage}
            total={posts.articlesCount * 2}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    )
  }

  return content
}
