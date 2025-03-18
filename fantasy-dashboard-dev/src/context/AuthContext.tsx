// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, Register, OtpParams } from './types'
import useConstantStore from 'src/features/constants/constants.service'
import { toast } from 'react-hot-toast'
import Api, { handleApiError } from 'src/api/Api'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  otp: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const getConstant = useConstantStore(state => state.get)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: 'Bearer ' + storedToken
            }
          })
          .then(async response => {

            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            localStorage.removeItem('mm11Admin')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const handleLogin = async (bodyData: LoginParams, errorCallback?: ErrCallbackType) => {


    try {
      const data = await toast.promise(
        Api.post(authConfig.loginEndpoint, bodyData, { formData: true }),
        {
          loading: 'Sending Otp...',
          success: (res: any) => {
            return res?.data?.status
          },
          error: err => {
            return handleApiError(err)
          }
        }
      )

      return data

    }
    catch (err) {
      console.log(err)
      return false
    }


  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('mm11Admin')
    window.localStorage.removeItem('bot-storage')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }



  const handleSignUp = async (params: Register, errorCallback?: ErrCallbackType) => {

    try {
      const data = await toast.promise(
        axios.post(authConfig.registerEndPoint, params),
        {
          loading: 'Creating New User ...',
          success: (res: any) => {
            return res?.data?.message
          },
          error: err => {
            return handleApiError(err)
          }
        }
      )
      router.replace('/login')
      return data

    }
    catch (err) {
      console.log(err)
    }


  }


  const handleOtp = async (bodyData: OtpParams, errorCallback?: ErrCallbackType) => {
    try {
      const data = await toast.promise(
        Api.post(authConfig.otpPoint, bodyData, { formData: true }),
        {
          loading: 'Verifying Otp...',
          success: (res: any) => {
            if (res.status) {
              window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.token)
              const returnUrl = router.query.returnUrl
              setUser({ ...res.data.user })
              window.localStorage.setItem('mm11Admin', JSON.stringify(res.data.user))
              const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
              router.replace(redirectURL as string)
              // router.replace('/dashboards/analytics')
            }



            return res?.data?.status

          },
          error: err => {
            return handleApiError(err)
          }
        }
      )

      return data

    }
    catch (err) {
      console.log(err)
    }
  }


  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignUp,
    otp: handleOtp,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
