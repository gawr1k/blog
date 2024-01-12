import { Pagination, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchPosts,
  selectPosts,
  selectLoadingPosts,
} from '../../store/slices/postsSlice.js'
import Post from '../Post/Post.jsx'

import style from './PostList.module.scss'

export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1)
  const loading = useSelector(selectLoadingPosts)
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)

  useEffect(() => {
    dispatch(fetchPosts(currentPage))
  }, [currentPage])
  return loading ? (
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  ) : (
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
