
import moment from "moment";
import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface PaymentData {
  Amount: string;
  ClosingBalance: string;
  CurrentBalance: string;
  Email: string;
  OpeningBalance: string;
  PaymentDate: string;
  PaymentType: string;
  Phone: string;
  User_Type: string;
  Username: string;
  description: string;
  id: string;
  list: PaymentData[]
}




let timeOut: any
const path = 'leaderboard/admin_added_user/procedure'

const usePaymentStore = create(
  combine({
    pay: {
      id: null as any,
      list: [] as PaymentData[],
      fromDate: '' + moment().subtract(1, 'days').format('YYYY-MM-DD'),
      toDate: '' + moment().subtract(1, 'days').format('YYYY-MM-DD'),
      type: 'ALL',
      userInfo: '',
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as PaymentData | undefined,
      isUser: false as boolean
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { pay: { fromDate, toDate, type, userInfo } } = get()

          const data = toast.promise(Api.get(path, { query: { fromDate, toDate, type, userInfo } }), {
            loading: 'fetching...',
            success: res => {
              console.log('res', res)
              set(prev => (
                {
                  pay: {
                    ...prev.pay,
                    total: res?.data.length,
                    list: res?.data
                  }

                }

              ))
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
          set(prev => ({ pay: { ...prev.pay, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              pay: {
                ...prev.pay,
                page: page || prev.pay.page,
                per_page: per_page || prev.pay.per_page,
                search: search || prev.pay.search,
                paginate: paginate ?? true
              }
            }))
            usePaymentStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ pay: { ...prev.pay, search: search } }))
            return
          }
          init()
        }

      },
    })
  )
)


export default usePaymentStore;





