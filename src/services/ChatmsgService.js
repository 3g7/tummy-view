import axios from '../boot/axios.js'

const URL = '/chatmsg'

const ChatmsgService = {
  pageableSearch: (search) => {
    return axios.fetchGet(URL + '?pageable=true', search)
  },

  rank: (search) => {
    return axios.fetchGet(URL + '/rank', search)
  }
}

export default ChatmsgService
