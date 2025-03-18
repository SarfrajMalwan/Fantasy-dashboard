import toast from 'react-hot-toast'
import Api from 'src/api/Api'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface User {
  id: number

  page: number
  per_page: number
  is_sys_user: boolean
  promoter_type: string
  email_verified: boolean
  phone_verified: boolean
  phone: string
  username: string
  document_verified: boolean
  created_at: string
  email: string
  userDetails: string
  signUpDate: string
  sendNotification: boolean
  userinfo: User
  list: User[]
  bank: string
  pan: string

  name: string
}

let timeOut: any
const path = '/users'

const userStore = create(
  combine(
    {
      user: {
        id: null as any,
        list: [] as User[],
        total: 0,
        page: 1,
        per_page: 10,
        search: null as string | null,
        paginate: true as boolean,
        detail: undefined as User | undefined,
        isUser: false as boolean
      }
    },
    (set, get) => ({
      get: {
        list: async () => {
          const {
            user: { page, per_page, search, paginate }
          } = get()

          toast.promise(Api.get(path, { query: { page, per_page, search, paginate: paginate ? 'YES' : 'NO' } }), {
            loading: 'fetching...',
            success: res => {
              console.log('res', res)
              set(prev => ({
                user: {
                  ...prev.user,
                  total: res?.data?.total,
                  list: res?.data?.users
                }
              }))
              return 'data'
            },
            error: err => {
              return 'data'
            }
          })
        },
        paginate: ({
          page,
          per_page,
          search,
          paginate
        }: {
          page?: number
          per_page?: number
          search?: string
          paginate?: boolean
        }) => {
          set(prev => ({ user: { ...prev.user, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              user: {
                ...prev.user,
                page: page || prev.user.page,
                per_page: per_page || prev.user.per_page,
                search: search || prev.user.search,
                paginate: paginate ?? true
              }
            }))
            userStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ user: { ...prev.user, search: search } }))
            return
          }
          init()
        }
      }
    })
  )
)

export default userStore
