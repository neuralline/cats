import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImageCard from '../components/ImageCard'
import Loading from '../components/Loading'
import SocialMediaCard from '../components/SocialMediaCard'
import { StoreContext } from '../context/Provider'
import { ICats } from '../global-cats-env'

const Post = ({ location }: any) => {
  const { id }: any = useParams()
  const { Cats, message }: any = useContext(StoreContext)
  const catPost: ICats = Cats.filter((cat: ICats) => cat.id === id)[0]
  return (
    <>
      <main>
        {catPost ? (
          <>
            <ImageCard image={catPost} />
            <div className="transition"></div>
            <Link to="/">
              <button className="btn shadow transition">Back.</button>
            </Link>
          </>
        ) : (
          <Loading message={message} />
        )}
      </main>
      <SocialMediaCard />
    </>
  )
}

export default Post
