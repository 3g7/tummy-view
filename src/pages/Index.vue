<template>
  <q-page class="flex flex-center">
    <q-card flat bordered square class="liveInfo">
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
          又鸽了，上次开播时间：{{liveInfo.start_time}}
        </div>
      </q-img>
    </q-card>
    <!-- <img alt="Tummy logo" :src="avatar"> -->
  </q-page>
</template>

<script>
import DouyuService from '../services/DouyuService'
export default {
  name: 'PageIndex',
  data () {
    return {
      roomId: '265438',
      liveInfo: {}
    }
  },

  methods: {
    loadLiveInfo (roomId) {
      DouyuService.getRoomInfo(roomId).then((response) => {
        this.liveInfo = response.data.data
      }, (error) => {
        console.log(error)
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
  max-width: 450px
}
</style>
