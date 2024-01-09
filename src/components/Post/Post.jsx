/* eslint-disable react/no-array-index-key */
import like from '../../assets/like__icon.svg'
import avatar from '../../assets/avatar_blog.svg'

import style from './Post.module.scss'

export default function Post({ post }) {
  console.log(post)
  return (
    <div className={style.post__container}>
      <div>
        <div>
          <div className={style.title__container}>
            <h3 className={style.title}>{post.title}</h3>
            <div className={style.like__container}>
              <img src={like} alt="like" />
              <h5 className={style.heart__count}>{post.favoritesCount}</h5>
            </div>
          </div>
          {post.tagList.map((tag, index) => (
            <span key={index} className={style.tag}>
              {tag}
            </span>
          ))}
          <p className={style.text}>{post.body}</p>
        </div>
      </div>
      <div className={style.container__bio}>
        <div className={style.container__name__data}>
          <h3 className={style.name}>{post.author.username}</h3>
          <h5 className={style.data}>
            {new Date(post.createdAt).toLocaleDateString()}
          </h5>
        </div>
        <img className={style.avatar} src={avatar} alt="" />
      </div>
    </div>
  )
}
