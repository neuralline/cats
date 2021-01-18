import {useContext} from 'react'
import {Link} from 'react-router-dom'
import ImageCard from '../components/ImageCard'
import Loading from '../components/Loading'
import {StoreContext} from '../context/Provider'
import '../css/cats-app-cards.css'
import {ICats} from '../global-cats-env'

const Home = () => {
  const {Cats, message}: any = useContext(StoreContext)
  //console.log('Cats from Home', Cats)
  //list all cat images [cat]
  return (
    <main className="main" data-testid="home">
      <h1>{message}</h1>
      <ul className="cats-list">
        {Cats.length ? (
          Cats.map((image: ICats, index: number) => (
            <li key={index}>
              <Link to={`/post/${image.id}`}>
                <ImageCard image={image} />
              </Link>
            </li>
          ))
        ) : (
          <>
            <Loading message={message} />
          </>
        )}
      </ul>
    </main>
  )
}

export default Home
