<template>
  <div>
    <!-- place QPageSticky at end of page -->
    <q-page-sticky expand position="top" style="z-index:1">
        <q-toolbar class="bg-blue-1 text-primary" style="padding: 12px">
            <div class="row q-col-gutter-md">
                <div class="col-8">
                    <q-input color="blue" clearable square outlined v-model="search.nickname" label="斗鱼ID"></q-input>
                </div>
                <!-- <div class="col">
                    <q-input color="blue" clearable square outlined v-model="search.txt" label="弹幕内容"></q-input>
                </div> -->
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
                </div> -->
                <div class="col">
                    <q-btn :loading="isSearching" round outline color="primary" size="19px" icon="search" @click="doSearch()"></q-btn>
                </div>
            </div>
        </q-toolbar>
    </q-page-sticky>
    <q-infinite-scroll ref="infiniteScrollRef" @load="onLoad" style="margin-top:80px;">
      <q-item-label header>当前条件共有 {{total | NumFormat}} 条弹幕</q-item-label>
      <div v-for="(item, index) in items" :key="index">
        <q-item>
          <q-item-section class="col-1">
            <p class="text-italic">{{index + 1}}</p>
          </q-item-section>
          <q-item-section avatar top style="margin-right:16px">
            <q-avatar>
              <q-img :src="'https://apic.douyucdn.cn/upload/' + item.avatar + '_big.jpg?rltime'" />
            </q-avatar>
          </q-item-section>

          <q-item-section top class="col-2">
            <q-item-label class="text-weight-medium">{{item.nickname}}</q-item-label>
            <q-item-label caption lines="1">
                <q-badge color="blue">
                    {{item.fansBrand}} {{item.fansLevel}}
                </q-badge>
            </q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="3">
              <span class="text-weight-medium">{{item.txt}}</span>
              <!-- <span class="text-grey-8">- GitHub repository</span> -->
            </q-item-label>
            <q-item-label caption lines="1">发送日期 > {{item.timestamp | DateFormat}}</q-item-label>
            <!-- <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <span class="cursor-pointer">此弹幕被连续重复[10]次，点击查看详细（别点了都一样）</span>
            </q-item-label> -->
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
import { formatDate, formatNum } from '../../utils/commonUtils'
export default {
  data () {
    return {
      items: [],
      total: 0,
      search: {
        nickname: '刘飞儿faye',
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
      if (!this.search.nickname) {
        this.$q.notify({
          message: '数据量过大，必须输入一个昵称',
          color: 'red',
          icon: 'warning',
          position: 'top',
          timeout: 2500
        })
        this.goTop()
        done()
        return false
      }
      if (this.items && !this.isSearching) {
        this.loadChatmsg(done)
      } else {
        done()
      }
    },

    loadChatmsg (success) {
      ChatmsgService.pageableSearch(this.search).then((response) => {
        let data = response.data
        if (data.success) {
          if (data.size === 0) {
            this.initAllData = true
            this.$refs.infiniteScrollRef.stop()
          }
          this.items = this.items.concat(data.data)
          this.total = data.total
          this.search.page += 1
          if (success) {
            success()
          }
        } else {
          alert(data.message)
        }
      }, (error) => {
        console.log(error)
      })
    },

    doSearch () {
      this.goTop()
      if (!this.search.nickname) {
        this.$q.notify({
          message: '数据量过大，必须输入一个昵称',
          color: 'red',
          icon: 'warning',
          position: 'top',
          timeout: 2500
        })
        return false
      }
      this.$refs.infiniteScrollRef.resume()
      this.initAllData = false
      this.search.page = 0
      this.isSearching = true
      ChatmsgService.pageableSearch(this.search).then((response) => {
        this.isSearching = false
        let data = response.data
        if (data.success) {
          this.items = data.data
          this.total = data.total
          this.search.page = 1
        } else {
          alert(data.message)
        }
      }, (error) => {
        this.isSearching = false
        console.log(error)
      })
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
  }

}
</script>
