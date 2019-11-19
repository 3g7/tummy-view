<template>
  <div>
    <!-- place QPageSticky at end of page -->
    <q-page-sticky expand position="top" style="z-index:1">
      <q-toolbar class="bg-blue-1 text-primary" style="padding: 12px">
        <div class="row q-col-gutter-md">
          <div class="col">
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
          </div>
          <div class="col">
            <q-btn
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
      <q-banner v-show="isSearching" style="width:100%" inline-actions class="bg-orange text-white">
        排行榜需要对大量数据进行分组聚合，请耐心等待一会儿
      </q-banner>
    </q-page-sticky>
    <div style="margin-top:90px;">
      <div v-for="(item, index) in items" :key="index">
        <q-item>
          <q-item-section avatar>
            <div v-show="item.rank === 1" class="text-bold text-italic text-red-6">Rank.{{item.rank}}</div>
            <div v-show="item.rank === 2" class="text-bold text-italic text-purple-6">Rank.{{item.rank}}</div>
            <div v-show="item.rank === 3" class="text-bold text-italic text-orange-6">Rank.{{item.rank}}</div>
            <div v-show="item.rank > 3" class="text-bold text-italic text-blue-grey">Rank.{{item.rank}}</div>
          </q-item-section>
          <q-item-section avatar top style="margin-left:16px">
            <q-avatar>
              <q-img :src="'https://apic.douyucdn.cn/upload/' + item.avatar + '_big.jpg?rltime'" />
            </q-avatar>
          </q-item-section>
          <q-item-section top>
            <q-item-label lines="3">
              <span class="text-weight-medium">
                <q-badge v-show="item.rank <= 3" :color="rank2color(item.rank)" :text-color="rank2TextColor(item.rank)">{{rank2name(item.rank)}}</q-badge> {{item.nickname}}
              </span>
              <!-- <span class="text-grey-8">- GitHub repository</span> -->
            </q-item-label>
            <q-item-label caption lines="1">{{search.start}} 起至 {{search.end}}</q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <span>记录弹幕 {{item.count | NumFormat}} 条</span>
            </q-item-label>
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
      <q-inner-loading :showing="isSearching">
        <q-spinner-dots
          color="primary"
          size="4em"
        />
      </q-inner-loading>
    </div>
  </div>
</template>
<script>
import ChatmsgService from '../../services/ChatmsgService'
import { date } from 'quasar'
import { formatDate, formatNum } from '../../utils/commonUtils'
export default {
  data () {
    return {
      items: [],
      total: 0,
      search: {
        start: '2019/08/04',
        end: date.formatDate(new Date(), 'YYYY/MM/DD'),
        limit: 50
      },
      isSearching: false
    }
  },

  methods: {
    doSearch () {
      this.goTop()
      this.items = []
      this.isSearching = true
      let param = {
        start: date.extractDate(this.search.start, 'YYYY/MM/DD').getTime(),
        end: date.extractDate(this.search.end, 'YYYY/MM/DD').getTime(),
        limit: this.search.limit
      }
      ChatmsgService.rank(param).then(
        response => {
          this.isSearching = false
          if (response.success) {
            this.items = response.data
            this.total = response.total
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

    rank2name (rank) {
      switch (rank) {
        case 1: {
          return '弹幕冠军'
        }
        case 2: {
          return '弹幕亚军'
        }
        case 3: {
          return '弹幕季军'
        }
      }
    },

    rank2color (rank) {
      switch (rank) {
        case 1: {
          return 'yellow-5'
        }
        case 2: {
          return 'grey'
        }
        case 3: {
          return 'orange'
        }
      }
    },

    rank2TextColor (rank) {
      switch (rank) {
        case 1: {
          return 'red'
        }
      }
    },

    goTop () {
      document.documentElement.scrollTop = document.body.scrollTop
    }
  },

  mounted () {
    this.doSearch()
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
