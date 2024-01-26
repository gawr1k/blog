import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Spin, Button, Popconfirm } from 'antd'

// eslint-disable-next-line no-unused-vars
import { HANDLE_EDIT_CLICK, PATH_ARTICLE } from '../../routes'
import avatar from '../../assets/smiley-cyrus.jpg'
import ResultErr from '../ResultErr/ResultErr'
import useAuth from '../../hooks/use-auth'
import {
  selectArticle,
  selectLoadingArticle,
  fetchArticle,
  selectError,
  dellArticle,
  selectDelete,
  deleteInitial,
  addFavorite,
  removeFavorite,
  resetZeroArticleState,
} from '../../store/slices/articleSlice'
import { selectStatus } from '../../store/slices/loginSlice'
import like from '../../assets/like__icon.svg'
import activeLike from '../../assets/Heart_corazón 1.svg'

import style from './Slug.module.scss'

export default function Slug() {
  const dispatch = useDispatch()
  const article = useSelector(selectArticle)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const loading = useSelector(selectLoadingArticle)
  const [imgError, setImgError] = useState(false)

  const { slug } = useParams()
  const { isAuth, token, username } = useAuth()

  const [liked, setLiked] = useState()
  const [likeCount, setLikeCount] = useState()
  const likeIconSrc = liked ? activeLike : like
  const [authorArticle, setAuthurArticle] = useState('')
  const [editable, setEditable] = useState()
  const navigate = useNavigate()
  const dell = useSelector(selectDelete)

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(fetchArticle({ slug, token }))
    }
  }, [status, dispatch])

  useEffect(() => {
    setLikeCount(article.favoritesCount)
  }, [article])

  useEffect(() => {
    setLiked(article.favorited)
  }, [article])

  useEffect(() => {
    setAuthurArticle(article.author?.username || ' ')
    setEditable(authorArticle === username)
  }, [article, authorArticle])

  const onDelete = () => {
    dispatch(dellArticle({ slug, token }))
  }
  useEffect(() => {
    if (dell === true) {
      navigate(PATH_ARTICLE)
      dispatch(deleteInitial())
    }
  }, [dell])

  useEffect(
    () => () => {
      dispatch(resetZeroArticleState())
    },
    [dispatch]
  )

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

  const handleImgError = () => {
    setImgError(true)
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
          {article.tagList?.map((tag, index) => (
            <span key={`tag-${index}`} className={style.tag}>
              {tag}
            </span>
          )) || []}
          <p className={style.description}>{article.description}</p>
          <div className={style.body}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className={style.wrapping}>
        <div className={style.container__bio}>
          <div className={style.container__name__data}>
            <h3 className={style.name}>{article.author?.username || ''}</h3>
            <h5 className={style.data}>
              {article?.createdAt &&
                new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(article.createdAt))}
            </h5>
          </div>
          {imgError ? (
            <img className={style.avatar} src={avatar} alt="Avatar" />
          ) : (
            <img
              className={style.avatar}
              src={article.author?.image}
              onError={handleImgError}
              alt="Author Avatar"
            />
          )}
        </div>
        {editable && (
          <div className={style.container__btn}>
            <Popconfirm
              placement="rightTop"
              description="Are you sure to delete this article?"
              okText="Yes"
              cancelText="No"
              onConfirm={onDelete}
            >
              <Button style={{ height: 31, width: 78 }} danger>
                Delete
              </Button>
            </Popconfirm>
            <Button
              style={{
                height: 31,
                width: 65,
                borderColor: '#52C41A',
                color: '#52C41A',
              }}
              danger
              onClick={() => {
                HANDLE_EDIT_CLICK(slug, navigate)
              }}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
