//import cx from 'classnames'
import React, {useState} from 'react'

const LikeDislike = () => {
  const [likeButton, setLikeButton] = useState('')
  const [likeCounter, setLikeCounter] = useState(100)
  const [dislikeCounter, setDislikeCounter] = useState(25)

  const handleLike = () => {
    if (likeButton === 'liked') {
      setLikeCounter(likeCounter - 1)
      setLikeButton('')
    } else {
      if (likeButton === 'disliked') setDislikeCounter(dislikeCounter - 1)
      setLikeCounter(likeCounter + 1)
      setLikeButton('liked')
    }
  }
  const handleDisLike = () => {
    if (likeButton === 'disliked') {
      setDislikeCounter(dislikeCounter - 1)
      setLikeButton('neutral')
    } else {
      if (likeButton === 'liked') setLikeCounter(likeCounter - 1)
      setDislikeCounter(dislikeCounter + 1)
      setLikeButton('disliked')
    }
  }

  return (
    <>
      <div>
        <h2>Like/Dislike</h2>

        <button
          className={`like-button ${likeButton === 'liked' ? 'liked' : ''}`}
          onClick={handleLike}>
          Like | <span className="likes-counter">{likeCounter}</span>
        </button>
        <button
          className={`dislike-button ${
            likeButton === 'disliked' ? 'disliked' : ''
          }`}
          onClick={handleDisLike}>
          Dislike | <span className="dislikes-counter">{dislikeCounter}</span>
        </button>
      </div>
      <style>{`
                    .like-button, .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:   #585858;
                    }

                    .liked, .disliked {
                        font-weight: bold;
                        color: #1565c0;
                    }
                `}</style>
    </>
  )
}

export default LikeDislike
