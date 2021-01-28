import {FC, useContext} from 'react'
import {Link} from 'react-router-dom'
import ImageCard from '../components/ImageCard'
import Loading from '../components/Loading'
import {StoreContext} from '../context/Provider'
import '../css/cats-app-cards.css'
import {ICats} from '../global-cats-env'

const FavList: FC = () => {
  const {Cats, message}: any = useContext(StoreContext)
  const filterFavoriteCats = Cats.filter((cat: ICats) => cat.favorite === true)

  //list of favorite cats image [does not auto update ]
  return (
    <main>
      <h1>Your favorite list</h1>
      <ul className="cats-list">
        {filterFavoriteCats.length ? (
          filterFavoriteCats.map((Cat: ICats, index: number) => (
            <li key={index}>
              <Link to={`/post/${Cat.id}`}>
                <ImageCard image={Cat} />
              </Link>
            </li>
          ))
        ) : (
          <Loading message={message} />
        )}
      </ul>
    </main>
  )
}

export default FavList
