import axios from '../boot/axios.js'

const URL = '/dgb'

const DgbService = {
  pageableSearch: (search) => {
    return axios.fetchGet(URL + '?pageable=true', search)
  }
}

export default DgbService
