import { ICats, IFetch } from '../global-cats-env'
import { getCatsImage } from './fetch-data-from-server'

export const handleDeleteImageOnServer = async (Cat: ICats) => {
  const url = 'https://api.thecatapi.com/v1/images/'
  try {
    //prepare api for [favorite, unfavorite]

    //toggle between like and unlike rest method ['POST', 'DELETE']
    const prepareUri: IFetch = { method: 'DELETE', url: `${url}${Cat.id}` }

    //connect to api
    const response = await getCatsImage(prepareUri)
    console.log(response)
    /* if (response.message !== 'SUCCESS')
      return { error: true, message: response.message, data: { ...response } }
    //update store

    return {
      error: false,
      data: { ...response }
    } */
  } catch (err) {
    console.log('cat is down trying to vote image: ', err)
    return {
      error: true,
      message: 'cat is down trying to vote image',
      data: { err }
    }
  }
}
