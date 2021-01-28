import {
  arrowPath,
  deleteIconPath,
  favoriteIconPath
} from '../img/svg-path-elements'

const InteractiveCardElements = ({
  image,
  loadingInProgress,
  handleFavor,
  handleVote,
  handleDelete
}: any) => {
  const isDeleteEnabled = false
  return (
    <div className="cats-interactive-elements">
      <div className="card-foreground-cover transition">
        <h2>{image.original_filename}</h2>
      </div>
      <div className="interactive-icons">
        {loadingInProgress && <div className="loader"></div>}
      </div>
      <div className="interactive-icons">
        <div className="status-icons transition">
          {isDeleteEnabled && (
            <svg
              onClick={e => handleDelete(e, image.id)}
              className={`cat-favorite-icon btn up hop transition`}
              viewBox="0 0 512.001 512.001"
              role="img">
              <title>Delete photo</title>
              <path fill="currentColor" d={deleteIconPath} />
            </svg>
          )}
        </div>

        {/* <div className="score hop transition">{image.value}</div> */}
      </div>
      <div className="interactive-icons">
        <svg
          onClick={e => handleVote(e, 2)}
          className={`up hop transition ${image.value === 2 && 'active'}`}
          viewBox="0 0 512 512">
          <title>Vote this photo up</title>
          <path fill="currentColor" d={arrowPath} />
        </svg>
        <svg
          onClick={handleFavor}
          className={`transition ${image.favorite && 'active'}`}
          aria-hidden="false"
          focusable="false"
          role="img"
          viewBox="0 0 391.837 391.837">
          <title>Favorite this photo</title>
          <path fill="currentColor" d={favoriteIconPath} />
        </svg>
        <svg
          onClick={e => handleVote(e, 1)}
          className={`down hop transition ${image.value === 1 && 'active'}`}
          viewBox="0 0 512 512">
          <title>Vote this photo down</title>
          <path fill="currentColor" d={arrowPath} />
        </svg>
      </div>
    </div>
  )
}

export default InteractiveCardElements
