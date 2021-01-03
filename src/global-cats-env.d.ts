export interface IState {
  Cats?: [Cats] | any
  Favorites?: [Cats] | any
  Votes?: [IVote] | any
  error: boolean
  loading: boolean
  message: string
  navbar?: any
  user?: IUser
}

export interface IUser {
  id: string
  username: string
  url: string
  title: string
}
export interface IAction {
  type: string
  payload?: Cats | any
}
export interface ICats {
  id?: string
  url?: string
  original_filename?: string
  image_id?: string
  favorite?: boolean
  image?
  fav_id?: number
  vote_id?: number
  value?: number
}

export interface IVote {
  country_code?: string
  created_at?: string
  id: string
  image_id: string
  sub_id: string
  value: number
}
interface IMenu {
  title: string
  link: string
  icon?: string
}
export interface IFetch {
  method: string
  body?: any
  url?: string
  headers?: any
  IncludeHeaders?: boolean
}
export interface IResponse {
  message: string
  error: boolean
  data: ICats | [ICats] | any
}
