import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { User } from "../users/user.services";


export interface GstInfo {
  id: number;

  page: number;
  per_page: number;

  user: User;
  gst: number;
  actual_deposite_amt: number;
  created_at: number;

  list: GstInfo[]
}



let timeOut: any
const path = '/gst_info'

const useGstStore = create(
  combine({
    gst: {
      id: null as any,
      list: [] as GstInfo[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as GstInfo | undefined,
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { gst: { page, per_page, search, paginate } } = get()
          try {
            const data = toast.promise(Api.get(path, { query: { page, per_page, search, paginate: paginate ? 'YES' : 'NO' } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    gst: {
                      ...prev.gst,
                      total: res?.data?.total,
                      list: res?.data?.data

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
          set(prev => ({ gst: { ...prev.gst, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              gst: {
                ...prev.gst,
                page: page || prev.gst.page,
                per_page: per_page || prev.gst.per_page,
                search: search || prev.gst.search,
                paginate: paginate ?? true
              }
            }))
            useGstStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ gst: { ...prev.gst, search: search } }))
            return
          }
          init()
        }

      },
    })
  )
)


export default useGstStore
