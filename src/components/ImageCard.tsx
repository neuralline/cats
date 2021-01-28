import { FC, useContext, useState } from 'react'
import { StoreContext } from '../context/Provider'
import { handleDeleteImageOnServer } from '../functions/deleteStation'
import { handleFavorOnServer } from '../functions/favorStation'
import { handleVoteOnServer } from '../functions/voteStation'
import { ICats, IResponse } from '../global-cats-env'
import InteractiveCardElements from './InteractiveCardElements'

const ImageCard: FC<{image: ICats}> = ({image}) => {
  const {dispatch}: any = useContext(StoreContext)
  const [loadingInProgress, setLoadingInProgress] = useState(false)

  /***
   *
   * handle vote function [vote-up, vote-down, remove-vote, switch-vote]
   * and update local store
   */

  const handleVote = async (e: any, value: number) => {
    e.preventDefault()
    if (loadingInProgress) return
    setLoadingInProgress(true)
    //update store

    const response: IResponse = await handleVoteOnServer(value, {...image})
    if (response.error) {
      return dispatch({
        type: 'ERROR',
        payload: {...response}
      })
    }

    dispatch({
      type: 'UPDATE_CAT',
      payload: response.data.id
        ? {...image, vote_id: response.data.id, value: value}
        : {...image, value: 0}
    })

    setLoadingInProgress(false)
  }
  /**
   *
   * Process favor [on, off]
   * and update local store
   */

  const handleFavor = async (e: any) => {
    e.preventDefault()
    if (loadingInProgress) return
    setLoadingInProgress(true)
    const response: IResponse = await handleFavorOnServer({...image})
    //update store
    if (response.message !== 'SUCCESS') {
      return dispatch({
        type: 'ERROR',
        payload: {
          ...response
        }
      })
    }
    //update context state
    dispatch({
      type: 'UPDATE_CAT',
      payload: image.favorite
        ? {
            ...image,
            favorite: false
          }
        : {...image, fav_id: response.data.id || 0, favorite: true}
    })

    setLoadingInProgress(false)
    return
  }
  /**
   *
   * process Delete image from server
   * server is not responding on success
   */
  const handleDelete = async (e: any) => {
    e.preventDefault()
    if (loadingInProgress) return
    setLoadingInProgress(true)
    const response = await handleDeleteImageOnServer({...image})
    console.log('handleDeleteImageOnServer ', response)

    setLoadingInProgress(false)
  }
  /**
   *
   * return card
   */
  return (
    <>
      <div
        className="cat-cards shadow transition"
        title={image.original_filename}
        style={{
          backgroundImage: `url("${image.url}`
        }}>
        <InteractiveCardElements
          image={image}
          loadingInProgress={loadingInProgress}
          handleFavor={handleFavor}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default ImageCard
