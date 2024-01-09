import { Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPosts, selectPosts } from '../../store/slices/postsSlice'
import Post from '../Post/Post'

import style from './PostList.module.scss'

export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)

  useEffect(() => {
    dispatch(fetchPosts(currentPage))
  }, [currentPage, dispatch])

  return (
    <>
      {posts.map((post) => (
        <Post key={`${post.slug}-${post.createdAt}`} post={post} />
      ))}
      <div className={style.container__pagination}>
        <Pagination
          defaultCurrent={1}
          total={50}
          onChange={(page) => {
            setCurrentPage(page)
          }}
        />
      </div>
    </>
  )
}
