import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface ReferalUser {

  id: string;
  email: string;
  username: string;

  list: ReferalUser[]

  phone: number;

  referal_user: string;
  ref_username: string;
}



let timeOut: any
const path = 'referal-userlist'

const useReferalStore = create(
  combine({
    user: {
      id: null as any,
      list: [] as ReferalUser[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      detail: undefined as ReferalUser | undefined,

    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { user: { page, per_page, search } } = get()
          try {

            toast.promise(Api.get(path, { query: { page, per_page, search } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    user: {
                      ...prev.user,
                      total: res?.data?.total,
                      list: res?.data?.user_data,

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
            useReferalStore.getState().get.list()
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
            useReferalStore.getState().get.list()
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


export default useReferalStore
