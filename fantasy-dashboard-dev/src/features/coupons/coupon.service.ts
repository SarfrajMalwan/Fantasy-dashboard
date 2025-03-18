import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Coupon {

  id: string;
  bonus_percentage: string;
  cashback_percentage: number;
  code: string;
  created_at: string;
  expire_at: string | null;

  is_active: boolean;
  limit_per_user: number;
  main_percentage: string;
  max_amount: number;
  max_cashback: number;
  min_amount: number;
  updated_at: string;
  usage_limit: number;
  wallet_type: string;


  list: Coupon[]
}



let timeOut: any
const path = 'coupons'

const useCouponStore = create(
  combine({
    contest: {
      id: null as any,
      list: [] as Coupon[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      detail: undefined as Coupon | undefined,
    }
  },
    (set, get) => ({
      get: {
        list: async () => {
          const { contest: { page, per_page, search } } = get()
          try {

            toast.promise(Api.get(path, { query: { page, per_page, search } }), {
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
            useCouponStore.getState().get.list()
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
            useCouponStore.getState().get.list()
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


export default useCouponStore
