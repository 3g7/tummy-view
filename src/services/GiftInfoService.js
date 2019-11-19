import axios from '../boot/axios.js'

const URL = '/gift_info'

const GiftInfoService = {
  pageableSearch: (search) => {
    return axios.fetchGet(URL + '?pageable=true', search)
  },

  search: (search) => {
    return axios.fetchGet(URL, search)
  }
}

export default GiftInfoService
