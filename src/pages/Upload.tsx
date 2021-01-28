import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {StoreContext} from '../context/Provider'
import '../css/cats-app-cards.css'
import {CatNames} from '../functions/cat-names'
import {uploadImageToServer} from '../functions/upload-image-to-server'
import {IResponse} from '../global-cats-env'
import {uploadIconPath} from '../img/svg-path-elements'

interface Dispatch {
  store?: any
  dispatch?: any
}

interface Image {
  name: string
  type: string
}

const Upload = ({history}: any) => {
  const {message, dispatch}: any = useContext(StoreContext)
  const [userSelectedImage, setUserSelectedImage] = useState('')
  const catNewName = CatNames[Math.floor(Math.random() * CatNames.length)]
  const [uploadImageName, setUploadImageName] = useState(catNewName)
  const [status, setStatus] = useState('Upload your cat photo')
  const [uploading, setUploading] = useState(false)

  const handleError = (response: any) => {
    setStatus(response.message.split('.')[0] || 'Error while uploading image')
    setUploading(false)
    setUserSelectedImage('')
  }

  const handleChange = (e: any) => {
    e.preventDefault()
    if (!e.target.files[0].name) return
    setUserSelectedImage(e.target.files[0])
    setStatus('Pease name your cat')
  }

  const handleUpload = async () => {
    console.log('uploading...')
    try {
      if (!userSelectedImage) return setStatus('Pease select a cat image!')
      //display loading
      //if uploading is on return
      if (uploading) return
      //update progress status
      setUploading(true)
      setStatus('Uploading...')
      //prepare api connection

      //request connection
      const response: IResponse = await uploadImageToServer(
        uploadImageName,
        userSelectedImage
      )

      if (response.error === true) {
        handleError(response.data)
        return dispatch({
          type: 'ERROR',
          payload: {...response}
        })
      }

      //update context store
      if (!response.data.id) return handleError(response.data)
      setStatus('Uploading successful')
      dispatch({
        type: 'ADD_NEW_CAT',
        payload: {
          id: response.data.id,
          url: response.data.url,
          original_filename: uploadImageName,
          favorite: false,
          fav_id: 0,
          vote_id: 0,
          value: 0
        }
      })

      setUploading(false)
      setUserSelectedImage('')

      //head back to home page on successful upload
      history.push('/')
    } catch (err) {
      handleError({
        message: 'Cat is down trying to upload your photo',
        data: err
      })
      console.log('image upload', err)
    }
  }

  return (
    <main>
      <h1>{message}</h1>
      <div className="cat-cards cat-uploader shadow transition">
        <svg className="svg hop transition" role="img" viewBox="0 0 640 512">
          <path fill="currentColor" d={uploadIconPath} />
        </svg>
        <div>
          {uploading && <div className="loader"></div>}
          <h3>{status}</h3>
        </div>
        {!userSelectedImage ? (
          <>
            <input
              type="file"
              name="uploads"
              className="custom-file-input"
              onChange={handleChange}
              title="Click here to select your cat Photo"
              data-testid="select-upload-image"
            />
            <i>click here</i>
          </>
        ) : (
          <>
            <input
              type="text"
              name="cat-name"
              data-testid="select-cat-name"
              className="main-input shadow transition"
              placeholder={uploadImageName}
              onChange={e => {
                setUploadImageName(e.target.value)
              }}
            />
            <br />
            <button type="button" className="btn shadow" onClick={handleUpload}>
              Upload.
            </button>
          </>
        )}
      </div>
      <Link to="/">
        <button className="btn shadow transition" data-testid="submit-upload">
          Back.
        </button>
      </Link>
    </main>
  )
}

export default Upload
