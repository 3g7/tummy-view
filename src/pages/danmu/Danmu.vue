<template>
  <div>
    <!-- place QPageSticky at end of page -->
    <q-page-sticky expand position="top">
        <q-toolbar class="bg-blue-1 text-primary" style="padding: 12px">
            <div class="row q-col-gutter-md">
                <div class="col">
                    <q-input color="blue" clearable square outlined v-model="nickname" label="斗鱼ID"></q-input>
                </div>
                <div class="col">
                    <q-input color="blue" clearable square outlined v-model="txt" label="弹幕内容"></q-input>
                </div>
                <div class="col">
                    <q-input color="blue" clearable square outlined v-model="start" label="开始时间" mask="date">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                                <q-date v-model="start" @input="() => $refs.qDateProxyStart.hide()" />
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col">
                    <q-input color="blue" clearable square outlined v-model="end" label="结束时间" mask="date">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxyEnd" transition-show="scale" transition-hide="scale">
                                <q-date v-model="end" @input="() => $refs.qDateProxyEnd.hide()" />
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col">
                    <q-btn round outline color="primary" size="19px" icon="search">
                    </q-btn>
                </div>
            </div>
        </q-toolbar>
    </q-page-sticky>
    <q-infinite-scroll @load="onLoad" style="margin-top:80px;">
      <q-item-label header>当前条件下弹幕数量为：182,382</q-item-label>
      <div v-for="(item, index) in items" :key="index">
        <q-item style="position:inherit">
          <q-item-section avatar top>
            <q-avatar style="position:inherit">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section top class="col-2">
            <q-item-label class="text-weight-medium">禁断逍遥</q-item-label>
            <q-item-label caption lines="1">
                <q-badge color="blue">
                    飞儿 28
                </q-badge>
            </q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="3">
              <span class="text-weight-medium">冬马：我的人设就是百分百抽写真不中！</span>
              <!-- <span class="text-grey-8">- GitHub repository</span> -->
            </q-item-label>
            <q-item-label caption lines="1">发送日期 > 2019-9-24 22:16:25</q-item-label>
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
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      nickname: '',
      txt: '',
      start: '',
      end: ''
    }
  },

  methods: {

    onLoad (index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {})
          done()
        }
      }, 2000)
    }
  }

}
</script>
