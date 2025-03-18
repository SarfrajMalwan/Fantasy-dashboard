import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface UserTeam {

  id: string;
  email: string;
  fixture_name: string;
  name: string;
  phone: string;
  username: string;

  list: UserTeam[]
}



let timeOut: any
const path = 'user-team'

const useTeamsStore = create(
  combine({
    contest: {
      id: null as any,
      list: [] as UserTeam[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as UserTeam | undefined,
      from_date: null as string | null,
      to_date: null as string | null
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { contest: { page, per_page, search, paginate, from_date, to_date } } = get()
          try {

            toast.promise(Api.get(path, { query: { page, per_page, search, paginate: paginate ? 'YES' : 'NO', to_date, from_date } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    contest: {
                      ...prev.contest,
                      total: res?.data?.total,
                      list: res?.data?.data,

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
            useTeamsStore.getState().get.list()
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
            useTeamsStore.getState().get.list()
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


export default useTeamsStore
