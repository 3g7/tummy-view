<template>
  <div>
    <!-- place QPageSticky at end of page -->
    <q-page-sticky expand position="top" style="z-index:1">
      <q-toolbar class="bg-blue-1 text-primary" style="padding: 12px">
        <div class="row q-col-gutter-md">
          <div class="col-10">
            <q-input color="blue" clearable square outlined v-model="search.nickname" label="斗鱼ID"></q-input>
          </div>
          <!-- <div class="col">
                    <q-input color="blue" clearable square outlined v-model="search.txt" label="弹幕内容"></q-input>
          </div>-->
          <!-- <div class="col">
                    <q-input color="blue" clearable square outlined v-model="search.start" label="开始时间" mask="date">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                                <q-date v-model="search.start" @input="() => $refs.qDateProxyStart.hide()" />
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col">
                    <q-input color="blue" clearable square outlined v-model="search.end" label="结束时间" mask="date">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxyEnd" transition-show="scale" transition-hide="scale">
                                <q-date v-model="search.end" @input="() => $refs.qDateProxyEnd.hide()" />
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
          </div>-->
          <div class="col">
            <q-btn
              :loading="isSearching"
              round
              outline
              color="primary"
              size="19px"
              icon="search"
              @click="doSearch()"
            ></q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-page-sticky>
    <q-infinite-scroll ref="infiniteScrollRef" @load="onLoad" style="margin-top:80px">
      <q-item-label header>当前条件共有 {{total | NumFormat}} 条入场信息</q-item-label>
      <div v-for="(item, index) in items" :key="index">
        <q-item>
          <q-item-section class="col-1">
            <p class="text-italic">{{index + 1}}.</p>
          </q-item-section>
          <q-item-section avatar top style="margin-right:16px">
            <q-avatar>
              <q-img :src="'https://apic.douyucdn.cn/upload/' + item.avatar + '_big.jpg?rltime'" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="col-lg-1 col-md-2">
            <q-item-label class="text-weight-medium">{{item.nickname}}</q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <span>入场时间： {{item.timestamp | DateFormat}}</span>
            </q-item-label>
            <q-item-label lines="3">
              <span class="text-weight-medium q-gutter-xs">
                <q-badge color="orange">
                  <q-icon name="house" color="white" class="q-ml-xs" />
                  {{item.roomId}}
                </q-badge>
                <q-badge :color="liveStatus2Color(item.liveStatus)">
                  <q-icon name="alarm" color="white" class="q-ml-xs" />
                  {{liveStatus2Name(item.liveStatus)}}
                </q-badge>
              </span>
              <!-- <span class="text-grey-8">- GitHub repository</span> -->
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
      <q-item v-show="initAllData">
        <p class="text-primary">拉到底了！没有更多数据了</p>
      </q-item>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
<script>
import UenterService from '../../services/UenterService'
import Storage from '../../services/Storage'
import { formatDate, formatNum } from '../../utils/commonUtils'
export default {
  data () {
    return {
      items: [],
      total: 0,
      search: {
        nickname: null,
        page: 0,
        size: 25
      },
      isSearching: false,
      totalPage: 0,
      initAllData: false
    }
  },

  methods: {
    onLoad (index, done) {
      if (this.items && !this.isSearching) {
        this.loadChatmsg(done)
      } else {
        done()
      }
    },

    loadChatmsg (success) {
      UenterService.pageableSearch(this.search).then(
        response => {
          if (response.success) {
            if (response.size === 0) {
              this.initAllData = true
              this.$refs.infiniteScrollRef.stop()
              return false
            }
            this.items = this.items.concat(response.data)
            this.total = response.total
            this.search.page += 1
            if (success) {
              success()
            }
          } else {
            this.$q.notify({
              message: response.message,
              color: 'red',
              icon: 'warning',
              position: 'top',
              timeout: 2500
            })
          }
        },
        error => {
          this.$q.notify({
            message: error.response.data.message,
            color: 'red',
            icon: 'warning',
            position: 'top',
            timeout: 2500
          })
        }
      )
    },

    doSearch () {
      this.goTop()
      this.$refs.infiniteScrollRef.resume()
      this.initAllData = false
      this.search.page = 0
      this.isSearching = true
      UenterService.pageableSearch(this.search).then(
        response => {
          this.isSearching = false
          if (response.success) {
            this.items = response.data
            this.total = response.total
            this.search.page = 1
          } else {
            this.$q.notify({
              message: response.message,
              color: 'red',
              icon: 'warning',
              position: 'top',
              timeout: 2500
            })
          }
        },
        error => {
          this.isSearching = false
          this.$q.notify({
            message: error.response.data.message,
            color: 'red',
            icon: 'warning',
            position: 'top',
            timeout: 2500
          })
        }
      )
    },

    liveStatus2Name (status) {
      switch (status) {
        case 'y': {
          return '直播中'
        }
        case 'n': {
          return '未开播'
        }
        case '0': {
          return '未知'
        }
      }
    },

    liveStatus2Color (status) {
      switch (status) {
        case 'y': {
          return 'positive'
        }
        case 'n': {
          return 'negative'
        }
        case '0': {
          return 'primary'
        }
      }
    },

    goTop () {
      document.documentElement.scrollTop = document.body.scrollTop
    }
  },

  filters: {
    NumFormat: function (value) {
      return formatNum(value)
    },
    DateFormat: function (value) {
      return formatDate(value)
    }
  },

  mounted () {
    let current = Storage.get('current')
    if (current.defaultSearch) {
      this.search.nickname = current.defaultSearch
    }
  },

  watch: {
    'search.nickname': (newValue, oldValue) => {
      let current = Storage.get('current')
      current.defaultSearch = newValue
      Storage.set('current', current)
    }
  }
}
</script>
