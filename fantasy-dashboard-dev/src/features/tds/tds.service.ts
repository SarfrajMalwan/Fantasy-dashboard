import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Tds {
  id: string;
  username: string
  amount: number;
  pan_no: number;
}


let timeOut: any
const path = 'tds'

const useTdsStore = create(
  combine({
    user: {
      id: null as any,
      list: [] as Tds[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      detail: undefined as Tds | undefined,
      flag: '',

    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { user: { page, per_page, search, flag } } = get()
          try {

            toast.promise(Api.get(path, { query: { page, per_page, search, flag } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    user: {
                      ...prev.user,
                      total: res?.data?.data?.total,
                      list: res?.data?.data.data.map((user: any) => ({
                        ...user,
                        pan_no: res.data.pandata[user?.user_id],
                      }
                      ))
                    }
                  }
                ))
                return res?.message
              },
              error: err => {
                return err
              }
            })
          }
          catch (err) {
            console.log(err)
          }
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
                paginate: paginate ?? true,

              }
            }))
            useTdsStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ user: { ...prev.user, search: search } }))
            return
          }
          init()
        },

        detail: ({
          page,
          per_page,
          search,
          paginate,

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
                paginate: paginate ?? true,

              }
            }))
            useTdsStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ user: { ...prev.user, search: search } }))
            return
          }
          init()
        },

      },
      select: (id: any) => set(prev => ({ user: { ...prev.user, id: id } })),
    })
  )
)


export default useTdsStore
