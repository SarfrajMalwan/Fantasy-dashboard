import { Permission, Role } from 'src/features/roles/role.service'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
  pin: number
}

export type OtpParams = {
  otp: number;
  phone: number;
  hash: string;
}

export type UserDataType = {
  id: number
  name: string
  role_id: number
  email: string
  permissions: Permission
  created_at: string
  updated_at: string
  role: Role
  token: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  signup: (params: Register, errorCallback?: ErrCallbackType) => void
  otp: (params: OtpParams, errorCallback?: ErrCallbackType) => void
}

export const inputType: Record<string, string> = {
  string: 'text',
  email: 'email',
  number: 'number',
  date: 'date',
  'datetime-local': 'datetime-local'
}


export type Register = {

  //register

  name: string
  company: string
  email: string
  password: string
  confirm_pass: string
  phone: number
  gst: string

}
