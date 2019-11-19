import axios from 'axios'
import Qs from 'qs'
import storage from '../services/Storage'
import router from '../router'

axios.defaults.baseURL = '/'

const base = 'api'

axios.interceptors.request.use((config) => {
  config.headers.common['token'] = storage.get('token') || ''
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response.status === 401) {
    storage.remove('token')
    storage.remove('current')
    router.push('/login')
  }
  return Promise.reject(error)
})

export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(base + url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(base + url, { params: param })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function fetchDefaultPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function fetchDefaultGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  fetchPost,
  fetchGet,
  fetchDefaultPost,
  fetchDefaultGet
}
