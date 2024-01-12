import { Link } from 'react-router-dom'

import like from '../../assets/like__icon.svg'

import style from './Post.module.scss'

export default function Post({ post }) {
  return (
    <div className={style.post__container}>
      <div>
        <div>
          <div className={style.title__container}>
            <Link to={`/articles/post/${post.slug}`} className={style.title}>
              {post.title}
            </Link>
            <div className={style.like__container}>
              <img src={like} alt="like" />
              <h5 className={style.heart__count}>{post.favoritesCount}</h5>
            </div>
          </div>
          {post.tagList.map((tag, index) => (
            <span key={`tag-${index}`} className={style.tag}>
              {tag}
            </span>
          ))}
          <p className={style.text}>{post.description}</p>
        </div>
      </div>
      <div className={style.container__bio}>
        <div className={style.container__name__data}>
          <h3 className={style.name}>{post.author.username}</h3>
          <h5 className={style.data}>
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(post.createdAt))}
          </h5>
        </div>
        <img
          className={style.avatar}
          src={post.author.image}
          alt="Author Avatar"
        />
      </div>
    </div>
  )
}
