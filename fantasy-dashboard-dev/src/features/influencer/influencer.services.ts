import toast from "react-hot-toast";
import Api from "src/api/Api";
import { create } from "zustand";
import { combine } from "zustand/middleware";


export interface Influencers {
  id: number;

  page: number;
  per_page: number;
  is_sys_user: boolean;
  promoter_type: string;
  email_verified: boolean;
  phone_verified: boolean;
  phone: string;
  username: string;
  document_verified: boolean;
  created_at: string;
  email: string;
  userDetails: string;
  signUpDate: string;
  sendNotification: boolean;
  userinfo: Influencers
  list: Influencers[]

  bank: string;
  pan: string;
  name: string;
  influncer_commission: number;
  totaljoin: number


  //influencer details
  amount: number;
  contest_meta_data: {}
  fixture_meta_data: {}
}



let timeOut: any
const path = '/influencer'

const useInfluencerStore = create(
  combine({
    user: {
      id: null as any,
      list: [] as Influencers[],
      total: 0,
      page: 1,
      per_page: 15,
      search: null as string | null,
      paginate: true as boolean,
      detail: undefined as Influencers | undefined,
      isUser: false as boolean,
      influencerId: null as string | null
    }
  },
    (set, get) => ({
      get: {
        list: async (influencerId?: any) => {
          const { user: { page, per_page, search, paginate } } = get()
          try {

            toast.promise(Api.get(path, { query: { page, per_page, search, paginate: paginate ? 'YES' : 'NO', influencerId } }), {
              loading: 'fetching...',
              success: res => {
                console.log('res', res)
                set(prev => (
                  {
                    user: {
                      ...prev.user,
                      total: res?.data?.total,
                      list: res?.data?.data,

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
          set(prev => ({ user: { ...prev.user, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              user: {
                ...prev.user,
                page: page || prev.user.page,
                per_page: per_page || prev.user.per_page,
                search: search || prev.user.search,
                paginate: paginate ?? true,

              }
            }))
            useInfluencerStore.getState().get.list()
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ user: { ...prev.user, search: search } }))
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
          set(prev => ({ user: { ...prev.user, search: search || '' } }))
          clearTimeout(timeOut)
          const init = () => {
            set(prev => ({
              user: {
                ...prev.user,
                page: page || prev.user.page,
                per_page: per_page || prev.user.per_page,
                search: search || prev.user.search,
                paginate: paginate ?? true,
                influencerId: influencerId || prev.user.influencerId
              }
            }))
            useInfluencerStore.getState().get.list(influencerId)
          }

          if (search) {
            timeOut = setTimeout(() => {
              init()
            }, 1000)
            set(prev => ({ user: { ...prev.user, search: search } }))
            return
          }
          init()
        },



      },
      select: (id: any) => set(prev => ({ user: { ...prev.user, id: id } })),
      // add:(bodyData:any) =>set(prev=>())
    })
  )
)


export default useInfluencerStore
