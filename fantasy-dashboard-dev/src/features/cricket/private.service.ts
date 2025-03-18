import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Private {
  commission: number;
  contest_name: string;
  created_at: string;
  entry_fee: number;
  fixture: string;
  fixture_id: number;
  id: string;
  inning_number: number;
  invite_code: string;
  is_confirmed: boolean;
  joined: number;
  max_team: number;
  new_prize_breakup: null | any;
  prize: number;
  prize_breakup: PrizeBreakup[];
  status: string;
  total_teams: number;
  updated_at: string;
  user: string;
  user_id: string;
  winner_percentage: number;
  confirm: string;
  list: Private[]
}

interface PrizeBreakup {
  to: number;
  from: number;
  rank: string;
  prize: number;
  percentage: number
}

let timeOut: any
const path = 'private-contests'

const usePrivateStore = create(
  combine({
    contest: {
      id: null as any,
      list: [] as Private[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as Private | undefined,
      isUser: false as boolean,
      fixture_id: null as string | null
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { contest: { page, per_page, search, paginate, fixture_id } } = get()
          try {

            toast.promise(Api.get(path, { query: { page, per_page, search, paginate: paginate ? 'YES' : 'NO', fixture_id } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    contest: {
                      ...prev.contest,
                      total: res?.data?.contests.length,
                      list: res?.data?.contests,

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
          set(prev => ({ contest: { ...prev.contest, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              contest: {
                ...prev.contest,
                page: page || prev.contest.page,
                per_page: per_page || prev.contest.per_page,
                search: search || prev.contest.search,
                paginate: paginate ?? true,

              }
            }))
            usePrivateStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ contest: { ...prev.contest, search: search } }))
            return
          }
          init()
        },

        detail: ({
          page,
          per_page,
          search,
          paginate,
          fixture_id,
        }: {
          page?: number
          per_page?: number
          search?: string
          paginate?: boolean
          fixture_id?: string
        }) => {
          set(prev => ({ contest: { ...prev.contest, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              contest: {
                ...prev.contest,
                page: page || prev.contest.page,
                per_page: per_page || prev.contest.per_page,
                search: search || prev.contest.search,
                paginate: paginate ?? true,
                fixture_id: fixture_id || prev.contest.fixture_id
              }
            }))
            usePrivateStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ contest: { ...prev.contest, search: search } }))
            return
          }
          init()
        },

      },
      select: (id: any) => set(prev => ({ contest: { ...prev.contest, id: id } })),
      // add:(bodyData:any) =>set(prev=>())
    })
  )
)


export default usePrivateStore
