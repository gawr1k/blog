import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Spin } from 'antd'

import ResultErr from '../ResultErr/ResultErr.jsx'
import useAuth from '../../hooks/use-auth.js'
import {
  selectArticle,
  selectLoadingArticle,
  fetchArticle,
  selectError,
} from '../../store/slices/articleSlice.js'
import { selectStatus } from '../../store/slices/loginSlice.js'
import like from '../../assets/like__icon.svg'
import activeLike from '../../assets/Heart_corazón 1.svg'
import { addFavorite, removeFavorite } from '../../store/slices/likesSlice.js'

import style from './Slug.module.scss'

export default function Slug() {
  const dispatch = useDispatch()
  const article = useSelector(selectArticle)
  const { status } = useSelector(selectStatus)
  const error = useSelector(selectError)
  const loading = useSelector(selectLoadingArticle)
  const { slug } = useParams()
  const { isAuth, token } = useAuth()
  const [liked, setLiked] = useState(article.favorited)
  const [likeCount, setLikeCount] = useState(article.favoritesCount)
  const likeIconSrc = liked ? activeLike : like

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(fetchArticle({ slug, token }))
    }
  }, [status, dispatch, slug, token])

  useEffect(() => {
    setLikeCount(article.favoritesCount)
  }, [article])

  useEffect(() => {
    setLiked(article.favorited)
  }, [article])

  const handleClick = () => {
    switch (liked) {
      case false:
        setLiked(true)
        dispatch(addFavorite({ slug: article.slug, token }))
        setLikeCount((prevCount) => prevCount + 1)
        break
      case true:
        setLiked(false)
        dispatch(removeFavorite({ slug: article.slug, token }))
        setLikeCount((prevCount) => prevCount - 1)
        break
      default:
        break
    }
  }

  return loading ? (
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  ) : error ? (
    <ResultErr error={error} />
  ) : (
    <div className={style.post__container}>
      <div>
        <div>
          <div className={style.title__container}>
            <h3 className={style.title}>{article.title}</h3>
            {isAuth ? (
              <div
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                onClick={handleClick}
              >
                <input className={style.like_input} type="checkbox" />
                <div className={style.like__container}>
                  <img src={likeIconSrc} alt="like" />
                  <h5 className={style.heart__count}>{likeCount}</h5>
                </div>
              </div>
            ) : (
              <div className={style.like__container}>
                <img src={like} alt="like" />
                <h5 className={style.heart__count}>{article.favoritesCount}</h5>
              </div>
            )}
          </div>
          {article.tagList.map((tag, index) => (
            <span key={`tag-${index}`} className={style.tag}>
              {tag}
            </span>
          ))}
          <p className={style.description}>{article.description}</p>
          <div className={style.body}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className={style.container__bio}>
        <div className={style.container__name__data}>
          <h3 className={style.name}>{article.author.username}</h3>
          <h5 className={style.data}>
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(article.createdAt))}
          </h5>
        </div>
        <img
          className={style.avatar}
          src={article.author.image}
          alt="Author Avatar"
        />
      </div>
    </div>
  )
}
