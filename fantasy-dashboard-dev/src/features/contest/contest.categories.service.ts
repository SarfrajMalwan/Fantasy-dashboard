import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Contest {
  id: number;

  page: number;
  per_page: number;

  list: Contest[]
  created_at: string;

  contests_count: number;
  is_active: boolean;
  is_mini: number;
  name: string;
  sequence_by: number;
  sports_type: string;
  tagline: string;
}



let timeOut: any
const path = 'contest-categories'

const useContestStore = create(
  combine({
    contest: {
      id: null as any,
      list: [] as Contest[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as Contest | undefined,
      isUser: false as boolean,
      influencerId: null as string | null
    }
  },
    (set, get) => ({
      get: {
        list: async (influencerId?: any) => {
          const { contest: { page, per_page, search, paginate } } = get()
          try {

            toast.promise(Api.get(path, { query: { page, per_page, search, paginate: paginate ? 'YES' : 'NO', influencerId } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    contest: {
                      ...prev.contest,
                      total: res?.data?.contest_categories?.total,
                      list: res?.data?.contest_categories?.data ? res?.data?.contest_categories?.data : [],

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
            useContestStore.getState().get.list()
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
          influencerId,
        }: {
          page?: number
          per_page?: number
          search?: string
          paginate?: boolean
          influencerId?: string
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
                influencerId: influencerId || prev.contest.influencerId
              }
            }))
            useContestStore.getState().get.list(influencerId)
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


export default useContestStore
