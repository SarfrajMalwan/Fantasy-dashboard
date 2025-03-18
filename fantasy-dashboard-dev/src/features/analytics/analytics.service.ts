import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import Api from 'src/api/Api';
import toast from 'react-hot-toast';


// export type PlanPeriods = 'yearly' | 'monthly'
export interface Dashboard {
  total_users: number;
  today_deposit: number;
  monthTds: number;
  month_deposit: number;
  month_withdraw: number;
  total_contests: number;
  active_contests: number;
  winningWallet: number;
  cashBonusWallet: number;
  real_cashWallet: number;
  depositWallet: number;
  inactive_contests: number;
  today_joined_contests: number;
  verified_users: number;
  unverified_users: number;
  new_users: number;
  withdrawal_requests: number;
  todayWithdrawal: number;
  total_Infulancer: number;
  unverifiedAadhaar: number;

  data: DashboardElement
}

interface DashboardElement {
  name: string;
  value: string;
  path: string;
}


let timeOut: any
const path = '/dashboard'

const useDashboard = create(
  combine(
    {
      analytics: {
        id: null as any,
        user_id: null,
        total: 0,
        page: 1,
        size: 10,
        search: null as string | null,
        detail: undefined as Dashboard | undefined,
        total_hits: 0,
        today_total_hits: 0,
        remaining_hits: 0,
        data: {} as Dashboard
        // timeOut: null as any
      }
    },
    (set, get) => ({
      get: {
        list: async () => {
          const {
            analytics: { user_id }
          } = get()


          toast.promise(Api.get(path), {
            loading: 'fetching...',
            success: res => {
              // console.log(res.data)
              if (res) {
                set(prev => (
                  {
                    analytics: {
                      ...prev.analytics,
                      data: res?.data?.userdata
                    }
                  }))
              }

              return res?.message || 'fetched'
            },
            error: err => {
              return err
            }
          })
        },
      }
    })
  )
)

export default useDashboard
