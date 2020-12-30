import { ICats, IFetch, IResponse } from '../global-cats-env'
import { getCatsImage } from './fetch-data-from-server'

export const getIndividualInfo = async (Cat: ICats) => {
  const url = 'https://api.thecatapi.com/v1/images'

  try {
    //prepare api for [favorite, unfavorite]

    //toggle between like and unlike rest method ['POST', 'DELETE']
    const prepareUri: IFetch = {
      method: 'GET',
      url: `https://api.thecatapi.com/v1/images/${Cat.id}/analysis`
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
