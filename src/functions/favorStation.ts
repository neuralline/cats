import { ICats, IFetch, IResponse } from '../global-cats-env'
import { getCatsImage } from './fetch-data-from-server'

export const handleFavorOnServer = async (Cat: ICats) => {
  const url = 'https://api.thecatapi.com/v1/favourites'

  try {
    //prepare api for [favorite, unfavorite]
    const body = JSON.stringify({
      image_id: Cat.id,
      sub_id: 'cats-app'
    })

    //toggle between like and unlike rest method ['POST', 'DELETE']
    const prepareUri: IFetch = Cat.favorite
      ? { method: 'DELETE', url: `${url}/${Cat.fav_id}` }
      : {
          method: 'POST',
          body,
          url
        }

    //connect to api
    const response: IResponse = await getCatsImage(prepareUri)
    //update store

    //return value
    return { ...response }
  } catch (err) {
    console.log('error favor', err)
    return {
      error: true,
      message: 'Cat encountered error while favoring an image',
      data: { err }
    }
  }
}
