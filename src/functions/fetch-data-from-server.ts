import {IFetch} from '../global-cats-env'

export const getCatsImage = async ({
  method,
  body,
  url,
  IncludeHeaders = true
}: IFetch) => {
  try {
    const apiKey =
      process.env.API_KEY ||
      console.log('Catsgram: Please provide api key') ||
      ''

    if (!url || !method)
      return {
        error: true,
        message: 'Please provide url',
        data: []
      }

    const headers = new Headers(
      IncludeHeaders
        ? {'x-api-key': apiKey, 'Content-Type': 'application/json'}
        : {'x-api-key': apiKey}
    )
    const requestOptions: IFetch = {
      method,
      headers
    }
    if (body) requestOptions.body = body
    const res = await fetch(url, requestOptions)
    const response = await res.json()
    if (response.message === 'AUTHENTICATION_ERROR') {
      return {
        error: true,
        message: 'AUTHENTICATION_ERROR',
        data: []
      }
    }
    return {
      error: false,
      message: response.message || '',
      data: response
    }
  } catch (err) {
    console.log('Cat is down at connect to server api', err)
    return {
      error: true,
      message: 'Cat encountered error trying to connect to server',
      data: []
    }
  }
}
