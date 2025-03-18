import api from './api'



export default {
  meEndpoint: api.baseUrl + '/users/me',
  loginEndpoint: api.baseUrl + '/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'mm11Token',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  registerEndPoint: api.baseUrl + '/users/register/otp',
  otpPoint: api.baseUrl + '/auth/otplogin'
}
// mm11Token
