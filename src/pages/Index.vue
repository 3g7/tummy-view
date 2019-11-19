<template>
  <div>
    <q-banner dense class="bg-blue text-white">
      请注意, 本站所有数据均不保证其准确性与完整性，仅供参考！<br>
      最早数据于 2019-08-04 14:43:03 接收自斗鱼
    </q-banner>
    <div class="flex flex-center">
      <q-card flat bordered square class="liveInfo ">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="liveInfo.avatar"></q-img>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{liveInfo.room_name}}</q-item-label>
            <q-item-label caption>{{liveInfo.owner_name}}</q-item-label>
          </q-item-section>

          <q-btn type="a" target="_blank" size="xs" outline color="primary" label="前往直播间" :href="'https://douyu.com/'+roomId"></q-btn>
        </q-item>

        <q-img :src="liveInfo.room_thumb">
          <div class="absolute-bottom text-subtitle2 text-center" v-show="liveInfo.room_status=='1'">
            正在直播中，不要错过精彩哟
          </div>
          <div class="absolute-bottom text-subtitle2 text-center" v-show="liveInfo.room_status=='2'">
            努力长胖中，上次开播时间：{{liveInfo.start_time}}
          </div>
        </q-img>
      </q-card>
    </div>
    <!-- <img alt="Tummy logo" :src="avatar"> -->
  </div>
</template>

<script>
import DouyuService from '../services/DouyuService'
import Storage from '../services/Storage'
export default {
  name: 'PageIndex',
  data () {
    return {
      roomId: Storage.get('current').roomId,
      liveInfo: {}
    }
  },

  methods: {
    loadLiveInfo (roomId) {
      DouyuService.getRoomInfo(roomId).then((response) => {
        this.liveInfo = response.data
      }, (error) => {
        this.$q.notify({
          message: error.response.data.message,
          color: 'red',
          icon: 'warning',
          position: 'top',
          timeout: 2500
        })
      })
    }
  },

  mounted () {
    this.loadLiveInfo(this.roomId)
  }
}
</script>
<style lang="css" scoped>
.liveInfo{
  width: 100%;
  max-width: 500px;
  margin-top: 100px;
}
</style>
