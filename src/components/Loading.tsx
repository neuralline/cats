import {FC} from 'react'

const Loading: FC<{message: string}> = ({message}) => {
  return (
    <div className="cat-cards shadow hop transition">
      <div className="loader"></div>
      {message ? message : 'Loading...'}
    </div>
  )
}

export default Loading
