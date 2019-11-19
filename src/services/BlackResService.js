import axios from '../boot/axios.js'

const URL = '/newblackres'

const BlackResService = {
  pageableSearch: (search) => {
    return axios.fetchGet(URL + '?pageable=true', search)
  }
}

export default BlackResService
