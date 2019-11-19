import axios from '../boot/axios.js'

const URL = '/uenter'

const UenterService = {
  pageableSearch: (search) => {
    return axios.fetchGet(URL + '?pageable=true', search)
  }
}

export default UenterService
