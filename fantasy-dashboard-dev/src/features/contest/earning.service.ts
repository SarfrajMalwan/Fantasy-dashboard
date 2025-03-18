import toast from 'react-hot-toast'
import Api from 'src/api/Api'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface ContestEarning {
  id: number;
  Name: string;
  Total_Users: number;
  Total_Teams: number;
  Total_Users_Teams: string; 
  Contest_Category: string
  status: string
  Total_Contests: number
  Contests_Completed: number
  Contests_Canceled: number
  Daily_Contests: number
  Daily_Contests_Completed: number
  Daily_Contests_Canceled: number
  Normal_Investment: number
  Normal_Winner_Amount: number
  System_Winner_Amount: number
  System_Investment: number
  System_User_PnL: number
  Normal_User_PnL: number
  Bonus_Wallet: number
  Deposit_Wallet: number
  Winning_Wallet: number
  Discount_Wallet: number
  Amount_Collected: number
  Total_Commission: number
  Influencer_Commission: number
  Actual_Commission: number
  Normal_Users: number
  System_Users: number
  System_Investments: number
  Total_Commissions: number
  Commissions_Influencer: number
  Commissions_Actual: number
  Profit_Loss: number
}

let timeOut: any
const path = 'contest-templates'

const useContestEarning = create(
  combine(
    {
      earning: {
        id: null as any,
        list: [] as ContestEarning[],
        total: 0,
        page: 1,
        size: 10,
        search: null as string | null,
        paginate: true as boolean,
        detail: undefined as ContestEarning | undefined,
        isUser: false as boolean,
        influencerId: null as string | null
      }
    },
    (set, get) => ({
      get: {
        list: async (influencerId?: any) => {
          const {
            earning: { page, size, search, paginate }
          } = get()
          try {
            toast.promise(
              Api.get(path, { query: { page, size, search, paginate: paginate ? 'YES' : 'NO', influencerId } }),
              {
                loading: 'fetching...',
                success: res => {
                  console.log('res', res)
                  set(prev => ({
                    earning: {
                      ...prev.earning,
                      total: res?.data?.contest_templates?.total,
                      list: res?.data?.contest_templates?.data
                    }
                  }))
                  return 'data'
                },
                error: err => {
                  return 'data'
                }
              }
            )
          } catch (err) {
            console.log(err)
          }
        },
        paginate: ({
          page,
          size,
          search,
          paginate
        }: {
          page?: number
          size?: number
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
                size: size || prev.earning.size,
                search: search || prev.earning.search,
                paginate: paginate ?? true
              }
            }))
            useContestEarning.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ earning: { ...prev.earning, search: search } }))
            return
          }
          init()
        },

        detail: ({
          page,
          per_page,
          search,
          paginate,
          influencerId
        }: {
          page?: number
          per_page?: number
          search?: string
          paginate?: boolean
          influencerId?: string
        }) => {
          set(prev => ({ earning: { ...prev.earning, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              earning: {
                ...prev.earning,
                page: page || prev.earning.page,
                size: per_page || prev.earning.size,
                search: search || prev.earning.search,
                paginate: paginate ?? true,
                influencerId: influencerId || prev.earning.influencerId
              }
            }))
            useContestEarning.getState().get.list(influencerId)
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
      select: (id: any) => set(prev => ({ earning: { ...prev.earning, id: id } }))
      // add:(bodyData:any) =>set(prev=>())
    })
  )
)

export default useContestEarning
