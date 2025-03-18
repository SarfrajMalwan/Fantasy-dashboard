import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface DipositPayment {
  id: string;
  phone: string;
  description: string;
  type: string;
  matchInfo: string;
  status: string;
  amount: number;
  wallet: string;
  created_at: string;
}


let timeOut: any
const path = 'payments'

const useDipoPayStore = create(
  combine({
    user: {
      id: null as any,
      list: [] as DipositPayment[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      detail: undefined as DipositPayment | undefined,

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
                      list: res?.data?.payments,

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
            useDipoPayStore.getState().get.list()
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
            useDipoPayStore.getState().get.list()
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


export default useDipoPayStore
