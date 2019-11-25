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
      <q-item-label header>当前条件共有 {{total | NumFormat}} 条弹幕</q-item-label>
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

          <q-item-section top class="col-lg-1 col-md-2">
            <q-item-label class="text-weight-medium">{{item.nickname}}</q-item-label>
            <q-item-label caption lines="1">
              <q-badge color="blue" v-show="item.fansBrand">{{item.fansBrand}} {{item.fansLevel}}</q-badge>
              <q-badge color="grey" v-show="!item.fansBrand">未佩戴粉丝牌</q-badge>
            </q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="3">
              <span class="text-weight-medium">
                <q-badge color="orange">
                  <q-icon name="house" color="white" class="q-ml-xs" />
                  {{item.roomId}}
                </q-badge>
                <span> {{item.txt}}</span>
              </span>
              <!-- <span class="text-grey-8">- GitHub repository</span> -->
            </q-item-label>
            <q-item-label caption lines="1">发送时间 > {{item.timestamp | DateFormat}}</q-item-label>
            <q-item-label
              v-show="item.repeats.length > 0"
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <span
                class="cursor-pointer"
                @click="item.fold=!item.fold"
              >此弹幕内容连续重复{{item.repeats.length}}次，已折叠</span>
            </q-item-label>
            <q-slide-transition style="max-width:500px">
              <div v-show="item.fold">
                <q-list dense bordered padding style="margin-top:16px">
                  <!-- <q-item-label header>被折叠的内容</q-item-label> -->
                  <div v-for="(repeat, index) in item.repeats" :key="index">
                    <q-item dense>
                      <q-item-section>
                        <q-item-label lines="1">{{repeat.txt}}</q-item-label>
                        <q-item-label caption>{{repeat.timestamp | DateFormat}}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator spaced v-show="index != item.repeats.length - 1" />
                  </div>
                </q-list>
              </div>
            </q-slide-transition>
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
import ChatmsgService from '../../services/ChatmsgService'
import Storage from '../../services/Storage'
import { formatDate, formatNum } from '../../utils/commonUtils'
export default {
  data () {
    return {
      items: [],
      total: 0,
      search: {
        nickname: null,
        txt: null,
        start: null,
        end: null,
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
      ChatmsgService.pageableSearch(this.search).then(
        response => {
          if (response.success) {
            if (response.size < this.search.size) {
              this.initAllData = true
              this.$refs.infiniteScrollRef.stop()
              response.data = this.handleRepeat(response.data)
              this.items = this.items.concat(response.data)
              return false
            }
            response.data = this.handleRepeat(response.data)
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
      this.initAllData = false
      this.search.page = 0
      this.isSearching = true
      ChatmsgService.pageableSearch(this.search).then(
        response => {
          this.isSearching = false
          if (response.success) {
            if (response.size < this.search.size) {
              this.initAllData = true
              this.$refs.infiniteScrollRef.stop()
              response.data = this.handleRepeat(response.data)
              this.items = response.data
              return false
            }
            this.$refs.infiniteScrollRef.resume()
            response.data = this.handleRepeat(response.data)
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

    handleRepeat (chatmsgs) {
      let result = []
      if (chatmsgs.length <= 0) {
        return false
      }
      for (let i = 0; i < chatmsgs.length; i++) {
        chatmsgs[i].fold = false
        chatmsgs[i].repeats = []
        if (this.items.length > 0) {
          let last = this.items[this.items.length - 1]
          if (
            last.txt === chatmsgs[i].txt &&
            last.roomId === chatmsgs[i].roomId &&
            last.timestamp !== chatmsgs[i].timestamp
          ) {
            this.items[this.items.length - 1].repeats.push(chatmsgs[i])
            chatmsgs[i].isChild = true
          }
        }
        if (chatmsgs[i].isChild) {
          continue
        }
        chatmsgs[i].isChild = false
        let current = chatmsgs[i]
        for (let j = i + 1; j < chatmsgs.length; j++) {
          if (
            chatmsgs[j].txt === current.txt &&
            chatmsgs[j].roomId === current.roomId &&
            chatmsgs[j].timestamp !== current.timestamp
          ) {
            chatmsgs[j].isChild = true
            current.repeats.push(chatmsgs[j])
          } else {
            break
          }
        }
        result.push(current)
      }
      return result
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
