import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Leaderboard {
  id: number;

  page: number;
  per_page: number;

  deposit: number;
  email: string;
  phone: number;
  rank: number;
  username: string;

  list: Leaderboard[]
}



let timeOut: any
const path = '/influncer-leaderboard'

const useInfluencerLeaderboardStore = create(
  combine({
    leaderboard: {
      id: null as any,
      list: [] as Leaderboard[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as Leaderboard | undefined,
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { leaderboard: { page, per_page, search, paginate } } = get()
          try {
            const data = toast.promise(Api.get(path, { query: { page, per_page, search, paginate: paginate ? 'YES' : 'NO' } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    leaderboard: {
                      ...prev.leaderboard,
                      total: res?.data?.total,
                      list: res?.data?.users

                    }
                  }

                ))
                return 'data'
              },
              error: err => {
                return 'data'
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
          set(prev => ({ leaderboard: { ...prev.leaderboard, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              leaderboard: {
                ...prev.leaderboard,
                page: page || prev.leaderboard.page,
                per_page: per_page || prev.leaderboard.per_page,
                search: search || prev.leaderboard.search,
                paginate: paginate ?? true
              }
            }))
            useInfluencerLeaderboardStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ leaderboard: { ...prev.leaderboard, search: search } }))
            return
          }
          init()
        }

      },
    })
  )
)


export default useInfluencerLeaderboardStore
