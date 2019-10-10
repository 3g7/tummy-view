import axios from 'axios'

axios.defaults.baseURL = '/'

const base = 'api'
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
