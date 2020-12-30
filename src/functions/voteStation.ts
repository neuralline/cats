import { ICats, IFetch, IResponse } from '../global-cats-env'
import { getCatsImage } from './fetch-data-from-server'

export const handleVoteOnServer = async (value: number, Cat: ICats) => {
  const url = 'https://api.thecatapi.com/v1/votes'
  try {
    //prepare api for [favorite, unfavorite]
    const body = JSON.stringify({
      image_id: Cat.id,
      sub_id: 'cats-app',
      value: value - 1
    })

    //toggle between like and unlike rest method ['POST', 'DELETE']
    const prepareUri: IFetch =
      Cat.value === value
        ? { method: 'DELETE', url: `${url}/${Cat.vote_id}` }
        : {
            method: 'POST',
            body,
            url
          }

    //connect to api
    const response: IResponse = await getCatsImage(prepareUri)
    return { ...response }
  } catch (err) {
    return {
      error: true,
      message: 'Cat encountered error while voting',
      data: { err }
    }
  }
}
