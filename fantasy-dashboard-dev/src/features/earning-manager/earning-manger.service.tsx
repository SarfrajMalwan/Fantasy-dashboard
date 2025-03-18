import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface EarningManager {
  id: number;

  page: number;
  per_page: number;

  name: string;
  last_squad_update: string;
  payment_data: EarningManager;
  amount_used: string;
  total_amount: number;
  used_cash_bonus: number;
  used_winning_amount: number
  list: EarningManager[]
  used_deposited_balance: number;
  total_winning_distributed: number;
  total_earning: number;

  path: string;
}

// const path = 'earning-manager'

let timeOut: any

const useEarningManagerStore = create(
  combine({
    earning: {
      id: null as any,
      list: [] as EarningManager[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as EarningManager | undefined,
      status: 'COMPLETED,CANCELED',
      user_type: '',
      path: null as any,
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { earning: { path, user_type, page, per_page, search, status } } = get()
          try {
            if (path) {

              const data = toast.promise(Api.get(path, { query: { user_type, page, per_page, search, status } }), {
                loading: 'fetching...',
                success: res => {
                  console.log('res', res)
                  set(prev => (
                    {
                      earning: {
                        ...prev.earning,
                        total: res?.data?.fixtures.total,
                        list: res?.data?.fixtures?.data.map((obj: any) => ({
                          ...obj,
                          payment_data: JSON.parse(obj.payment_data)
                        }))

                      }
                    }

                  ))
                  return res.message
                },
                error: err => {
                  return err
                }
              })

            }
          }
          catch (err) {
            console.log(err)
          }

        },
        paginate: ({
          path,
          page,
          per_page,
          search,
          paginate
        }: {
          path: string
          page?: number
          per_page?: number
          search?: string
          paginate?: boolean
        }) => {
          set(prev => ({ earning: { ...prev.earning, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              earning: {
                ...prev.earning,
                page: page || prev.earning.page,
                per_page: per_page || prev.earning.per_page,
                search: search || prev.earning.search,
                paginate: paginate ?? true,
                path: path || prev.earning.path
              }
            }))
            useEarningManagerStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ earning: { ...prev.earning, search: search } }))
            return
          }
          init()
        }

      },
    })
  )
)


export default useEarningManagerStore
