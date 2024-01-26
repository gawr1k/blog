import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { PATH_POST } from '../../routes'
import { addFavorite, removeFavorite } from '../../store/slices/articleSlice'
import useAuth from '../../hooks/use-auth'
import like from '../../assets/like__icon.svg'
import activeLike from '../../assets/Heart_corazón 1.svg'
import avatar from '../../assets/smiley-cyrus.jpg'

import style from './Post.module.scss'

export default function Post({ post }) {
  const [liked, setLiked] = useState(post.favorited)
  const [likeCount, setLikeCount] = useState(post.favoritesCount)
  const { isAuth, token } = useAuth()
  const dispatch = useDispatch()
  const likeIconSrc = liked ? activeLike : like
  const [imgError, setImgError] = useState(false)

  const handleClick = () => {
    switch (liked) {
      case false:
        setLiked(true)
        dispatch(addFavorite({ slug: post.slug, token }))
        setLikeCount((prevCount) => prevCount + 1)
        break
      case true:
        setLiked(false)
        dispatch(removeFavorite({ slug: post.slug, token }))
        setLikeCount((prevCount) => prevCount - 1)
        break
      default:
        break
    }
  }

  useEffect(() => {
    setLikeCount(post.favoritesCount)
  }, [post.favoritesCount])

  useEffect(() => {
    setLiked(post.favorited)
  }, [post.favorited])

  const handleImgError = () => {
    setImgError(true)
  }

  return (
    <div className={style.post__container}>
      <div>
        <div>
          <div className={style.title__container}>
            <Link to={PATH_POST(post.slug)} className={style.title}>
              {post.title}
            </Link>
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
                <h5 className={style.heart__count}>{post.favoritesCount}</h5>
              </div>
            )}
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
        {imgError ? (
          <img className={style.avatar} src={avatar} alt="Avatar" />
        ) : (
          <img
            className={style.avatar}
            src={post.author.image}
            onError={handleImgError}
            alt="Author Avatar"
          />
        )}
      </div>
    </div>
  )
}
