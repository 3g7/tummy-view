import axios from '../boot/axios.js'
import Storage from '../services/Storage'

const URL = '/auth'

const AuthService = {

  authenticate: (passport) => {
    return axios.fetchPost(URL, passport)
  },

  getPassport: (token) => {
    if (!token) {
      token = Storage.get('token')
    }
    return axios.fetchGet(URL + '/get_passport', { token: token }).then((response) => {
      Storage.set('current', response.data[0])
      return response
    })
  }

}

export default AuthService
