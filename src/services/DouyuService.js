import axios from '../boot/axios.js'

const URL = '/douyu'

const DouyuService = {
  getRoomInfo: (roomId) => {
    return axios.fetchDefaultGet(URL + '/api/RoomApi/room/' + roomId, {})
  }
}

export default DouyuService
