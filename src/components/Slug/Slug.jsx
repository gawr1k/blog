import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Spin } from 'antd'

import {
  selectArticle,
  selectLoadingArticle,
  fetchArticle,
} from '../../store/slices/articleSlice.js'
import like from '../../assets/like__icon.svg'

import style from './Slug.module.scss'

export default function Slug() {
  const article = useSelector(selectArticle)
  const loading = useSelector(selectLoadingArticle)
  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchArticle(slug))
  }, [slug, dispatch])

  return loading ? (
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  ) : (
    <div className={style.post__container}>
      <div>
        <div>
          <div className={style.title__container}>
            <h3 className={style.title}>{article.title}</h3>
            <div className={style.like__container}>
              <img src={like} alt="like" />
              <h5 className={style.heart__count}>like</h5>
            </div>
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
