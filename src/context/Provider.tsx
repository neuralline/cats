import { createContext, useEffect, useReducer } from 'react'
import { getCatsImage } from '../functions/fetch-data-from-server'
import { addFavorite } from '../functions/sort-state-data'
import { IAction, ICats, IResponse, IState } from '../global-cats-env'

const initialState: IState = {
  Cats: [],
  Favorites: [],
  Votes: [],
  error: false,
  loading: true,
  message: 'Welcome to CATS GRAM 2021.',
  navbar: {
    logo: { title: 'CATS-GRAM', link: '/', icon: 'camera' },
    navList: [
      { title: 'Home', link: '/', icon: 'home' },
      { title: 'Favorites', link: '/favorites', icon: 'favorites' },
      { title: 'Your Votes', link: '/votes', icon: 'votes' },
      { title: 'Upload', link: '/upload', icon: 'upload' }
    ]
  }
}

const StoreContext = createContext({})
const storeReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'FETCH_CATS':
      return { ...state, Cats: [...action.payload] }
    case 'FETCH_ALL':
      return { ...state, ...action.payload }

    case 'ADD_NEW_CAT':
      return { ...state, Cats: [action.payload, ...state.Cats] }
    case 'UPDATE_CAT':
      const foundIndex = state.Cats.findIndex(
        (cat: ICats) => cat.id === action.payload.id
      )
      state.Cats[foundIndex] = action.payload
      return { ...state, Cats: [...state.Cats] }

    case 'ERROR':
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error
      }
    default:
      return {
        ...state,
        message: 'Cat! Unknown action',
        error: true
      }
  }
}

const StoreProvider: React.FC = (props: any) => {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  const prepareUri = {
    method: 'GET',
    url:
      'https://api.thecatapi.com/v1/images/?limit=24&size=small&include_vote=&include_favourite'
  }
  const getFavorites = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/favourites'
  }
  const getVotes = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/votes'
  }

  const connectToTheCatApi = async () => {
    try {
      const CatResponse: IResponse = await getCatsImage(prepareUri)

      if (CatResponse.error) {
        return dispatch({
          type: 'ERROR',
          payload: {
            error: true,
            message: CatResponse.message || 'Cat could not connect to server'
          }
        })
      }

      dispatch({
        type: 'FETCH_CATS',
        payload: CatResponse.data || []
      })
      const favResponse: IResponse = await getCatsImage(getFavorites)
      const voteResponse: IResponse = await getCatsImage(getVotes)
      dispatch({
        type: 'FETCH_ALL',
        payload: {
          Cats: addFavorite(
            CatResponse.data,
            favResponse.data,
            voteResponse.data
          ),
          votes: voteResponse.data,
          favorites: favResponse.data
        }
      })
    } catch (err) {
      console.log('cat is down at provider')
      return {
        error: true,
        message: 'I only have nine lives',
        data: { err }
      }
      //dispatch({ type: 'ERROR', payload: err.code })
    }
  }

  useEffect(() => {
    connectToTheCatApi()
  }, [])

  return <StoreContext.Provider value={{ ...state, dispatch }} {...props} />
}

export { StoreProvider, StoreContext }
