<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal bordered class="bg-white text-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title class="text-center"></q-toolbar-title>
        <q-btn stretch flat icon="new_releases" label="免责声明" @click="alert=true"/>
        <q-btn-dropdown
          flat
          icon="person"
          stretch
          :key="current.id"
          :label="current.nickname"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="64px">
                <img :src="current.avatar">
              </q-avatar>

              <div class="text-subtitle2 q-mt-md q-mb-xs">{{current.nickname}}</div>

              <div class="text-h7 q-mb-md">{{current.username}}</div>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column">
              <q-btn flat color="primary" icon="build" label="系统管理" style="margin-bottom:8px;" @click="coding"/>
              <q-btn flat color="primary" icon="vpn_key" label="修改密码" style="margin-bottom:8px;" @click="coding"/>
              <q-btn flat color="deep-orange" icon="block" label="退出登录" @click="logout"/>
            </div>

          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
    >
      <router-link tag="div" to="/">
        <div class="row flex-center bg-white" style="height: 115px;">
          <q-avatar rounded size="75px">
            <img alt="Tummy logo" src="~assets/xdz.png">
          </q-avatar>
          <div class="caption q-ml-md text-bold">
            Tummy System
            <div class="text-italic text-yellow-10">1.0.1 bate</div>
          </div>
        </div>
      </router-link>
      <q-list>
        <q-item-label header>功能列表</q-item-label>
        <q-item v-show="!feature.coding" clickable :to="feature.path" active-class="bg-blue-1 text-blue-9" v-for="feature of features" :key="feature.id">
          <q-item-section avatar>
            <q-icon :name="feature.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{feature.label}}</q-item-label>
            <q-item-label caption>{{feature.desc}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="alert" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">免责声明</div>
        </q-card-section>

        <q-card-section>
          本站所有数据与功能均无商业用途，仅供学习使用，如果有任何侵犯到您合法权益的可能，请联系本站管理者，进行相关信息的剔除。
        </q-card-section>

        <q-card-section>
          All data and functions of this site are not for commercial use, only for learning. If there is any possibility of infringement on your legitimate rights and interests, please contact the administrator of this site to remove relevant information.
        </q-card-section>

        <q-card-section>
          管理员/Administrator: @3g7 [Email: 3g7@fayelau.com]
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="我已知晓并同意以上信息" color="primary" v-close-popup @click="closeAlert" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import Storage from '../services/Storage'
export default {
  name: 'Layout',

  data () {
    return {
      alert: false,
      leftDrawerOpen: false,
      current: {},
      features: [
        // {
        //   path: '/danmu_and_gift',
        //   icon: 'message',
        //   label: '弹幕与礼物',
        //   desc: '对弹幕与礼物的历史进行详尽查询'
        // },
        {
          path: '/danmu',
          icon: 'message',
          label: '弹幕查询',
          desc: '对直播间的弹幕信息进行详尽查询'
        },
        {
          path: '/gift',
          icon: 'cake',
          label: '礼物查询',
          desc: '对直播间收到的礼物进行详尽查询'
        },
        {
          path: '/uenter',
          icon: 'directions_run',
          label: '入场记录',
          desc: '水友进入直播间的记录'
        },
        {
          path: '/blackres',
          icon: 'block',
          label: '封禁记录',
          desc: '直播间封禁回执信息'
        },
        {
          path: '/rank',
          icon: 'format_list_numbered',
          label: '水友排行榜',
          desc: '水友发送弹幕的排行榜'
        },
        {
          path: '/qqgroup',
          icon: 'group',
          label: '群信息查询',
          desc: 'QQ群：265438的信息查询',
          coding: true
        },
        {
          path: '/brand',
          icon: 'how_to_reg',
          label: '粉丝牌查询',
          desc: '只能查询在直播间发过言的水友',
          coding: true
        },
        {
          path: '/live',
          icon: 'sync',
          label: '实时直播消息',
          desc: '实时获取清晰明确的直播间消息',
          coding: true
        }
      ]
    }
  },

  methods: {
    closeAlert: function () {
      Storage.set('isNotFirst', true)
    },

    logout: function () {
      Storage.remove('token')
      this.$router.push('/')
    },

    coding () {
      this.$q.notify({
        message: '功能尚在开发中',
        color: 'red',
        icon: 'warning',
        position: 'top',
        timeout: 2500
      })
    }
  },

  mounted () {
    if (!Storage.get('isNotFirst')) {
      this.alert = false
    }
    this.current = Storage.get('current')
  }
}
</script>
