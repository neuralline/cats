import { IResponse } from '../global-cats-env'
import { getCatsImage } from './fetch-data-from-server'

export const uploadImageToServer = async (catName: string, photo: any) => {
  const url = 'https://api.thecatapi.com/v1/images/upload'

  const body = new FormData()
  //@ts-ignore
  body.append('file', photo, catName)
  body.append('sub_id', 'cats-app')

  const prepareUri = {
    method: 'POST',
    IncludeHeaders: false,
    body,
    url
  }

  try {
    //connect to api
    const response: IResponse = await getCatsImage(prepareUri)
    //update store
    console.log('uploadImageToServer response', response)
    //return value
    return { ...response }
  } catch (err) {
    console.log('error uploading', err)
    return {
      error: true,
      message: 'Cat encountered error while uploading an image',
      data: { err }
    }
  }
}
