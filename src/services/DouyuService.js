import axios from '../boot/axios.js'

const URL = '/douyu'

const DouyuService = {
  getRoomInfo: (roomId) => {
    return axios.fetchDefaultGet(URL + '/api/RoomApi/room/' + roomId, {})
  },
  getGiftJson: () => {
    return axios.fetchDefaultGet('/douyucdn/resource/common/prop_gift_list/prop_gift_config.json', {})
  }
}

export default DouyuService
