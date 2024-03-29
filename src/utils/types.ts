

export type TFetchOptions = RequestInit & {
  checkRefresh?: boolean,
  headers?: HeadersInit & {
    'authorization'?: string
  }
}


export type TIngredient = {
    _id:            string
    name:           string
    type:           string
    proteins?:      number
    fat?:           number
    carbohydrates?: number
    calories?:      number
    price:          number
    image:          string
    image_mobile:   string
    image_large:    string
    __v?:           number
    uuid?:          number
    count?:         number
}


export type TType = {
  type:     string
  name:     string
  entries:  Array<number>
}

export type Ttth = {
  name:   'calories' | 'proteins' | 'fat' | 'carbohydrates'
  title:  string
  ext:    string
}

export type Ttoken = {
  token:  string | null
}

export type TUser = {
  name:     string
  email:    string
  password: string
}


export type TUserResponse = {
  success: boolean
  accessToken: string
  refreshToken:string
  user: {
      email:string
      name: string
  }
}


export type TConnect = null | true | false;


export type TFeedData = {
  orders:       TFeedOrder[],
  susses:       boolean,
  total:        number,
  totalToday:   number,
}

export type TOrderStatus = 'created' | 'pending' | 'done'


export type TIndex = {[n: string]: number}


export type TFeedOrder = {
  createdAt:    string,
  ingredients:  string[],
  name:         string,
  number:       number
  status:       TOrderStatus,
  updatedAt:    string,
  _id:          string,
}