

import moment from "moment";
import toast from "react-hot-toast";
import Api, { handleApiError } from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Mis {

  id: number
  Verified_By: string;
  Adhaar_Count: number;
  Bank_Count: number;

  Total: total

  list: Mis[]

}

interface total {
  Bank_Count: number;
  Adhaar_Count: number;
}


let timeOut: any
const path = '/DailyMIS'

const useMisReport = create(
  combine({
    mis: {
      id: null as any,
      list: [] as Mis[],
      date: '' + moment().format('MMDD'),
      Total: {} as total
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { mis: { date } } = get()

          toast.promise(Api.get(path, { query: { date } }), {
            loading: 'fetching...',
            success: res => {
              console.log('res', res)
              set(prev => (
                {

                  mis: {
                    ...prev.mis,
                    Total: res?.Total,
                    list: res?.Data.map((obj: any, index: number) => ({
                      ...obj,
                      id: index + 1
                    }))

                  },

                }


              ))
              return 'data'
            },
            error: err => {
              handleApiError(err)
              return 'data'
            }
          })
        },
        paginate: () => {
          set(prev => ({ mis: { ...prev.mis } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              mis: {
                ...prev.mis,
              }
            }))
            useMisReport.getState().get.list()
          }

          init()
        }

      },
    })
  )
)


export default useMisReport
