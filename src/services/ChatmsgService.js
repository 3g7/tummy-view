import axios from '../boot/axios.js'

const URL = '/chatmsg'

const ChatmsgService = {
  pageableSearch: (search) => {
    return axios.fetchGet(URL + '?pageable=true', search)
  }
}

export default ChatmsgService
