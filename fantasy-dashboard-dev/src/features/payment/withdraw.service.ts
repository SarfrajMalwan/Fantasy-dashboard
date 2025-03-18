import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Withdraw {
  name: string;
  email: string;
  id: string;
  phone: string;
  description: string;
  type: string;
  matchInfo: string;
  status: string;
  amount: number;
  wallet: string;
  payment_at: string;
  created_at: string;
}


let timeOut: any
const path = 'payments'

const useWithdrawStore = create(
  combine({
    user: {
      id: null as any,
      list: [] as Withdraw[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      detail: undefined as Withdraw | undefined,
      status: 'PENDING',
      auto_payment: 1,
      type: "WITHDRAW",
      mode: "WITHDRAW",
      user_id: '',
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { user: { status, auto_payment, type, mode, page, per_page, search, user_id } } = get()
          try {

            toast.promise(Api.get(path, { query: { status, auto_payment, type, mode, page, per_page, search, user_id } }), {
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

              }
            }))
            useWithdrawStore.getState().get.list()
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
            useWithdrawStore.getState().get.list()
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


export default useWithdrawStore
