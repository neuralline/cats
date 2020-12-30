import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ImageCard from '../components/ImageCard'
import { StoreContext } from '../context/Provider'
import '../css/cats-app-cards.css'
import { ICats } from '../global-cats-env'

const VoteList = () => {
  const { Cats }: any = useContext(StoreContext)
  const votedUpList = Cats.filter((cat: ICats) => cat.id && cat.value === 2)
  const votedDownList = Cats.filter((cat: ICats) => cat.value === 1)

  //list of favorite cats image [does not auto update ]
  return (
    <main>
      <h2>Voted Up Cats</h2>
      <ul className="cats-list">
        {votedUpList.map((Cat: ICats, index: number) => (
          <li key={index}>
            <Link to={`/post/${Cat.id}`}>
              <ImageCard image={Cat} />
            </Link>
          </li>
        ))}
      </ul>
      <h2>Voted Down Cats</h2>
      <ul className="cats-list">
        {votedDownList.map((Cat: ICats, index: number) => (
          <li key={index}>
            <Link to={`/post/${Cat.id}`}>
              <ImageCard image={Cat} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default VoteList
