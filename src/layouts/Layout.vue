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
          label="就叫三个七"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="64px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>

              <div class="text-subtitle2 q-mt-md q-mb-xs">就叫三个七</div>

              <div class="text-h7 q-mb-md">3g7@fayelau.com</div>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column">
              <q-btn flat color="primary" icon="build" label="系统管理" style="margin-bottom:8px;"/>
              <q-btn flat color="primary" icon="vpn_key" label="修改密码" style="margin-bottom:8px;"/>
              <q-btn flat color="deep-orange" icon="block" label="退出登录" />
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
            <img alt="Tummy logo" src="~assets/xdz.gif">
          </q-avatar>
          <div class="caption q-ml-md">
            Tummy System
          </div>
        </div>
      </router-link>
      <q-list>
        <q-item-label header>功能列表</q-item-label>
        <q-item clickable :to="feature.path" active-class="bg-blue-1 text-blue-9" v-for="feature of features" :key="feature.id">
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
          <q-btn flat label="我已知晓并同意以上信息" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      alert: true,
      leftDrawerOpen: false,
      features: [
        {
          path: '/danmu',
          icon: 'message',
          label: '弹幕查询',
          desc: '对直播间弹幕历史进行详尽查询'
        },
        {
          path: '/gift',
          icon: 'cake',
          label: '礼物查询',
          desc: '对直播间收到的礼物进行详尽查询'
        },
        {
          path: '/newblackres',
          icon: 'block',
          label: '封禁记录',
          desc: '直播间封禁回执信息'
        },
        {
          path: '/qqgroup',
          icon: 'group',
          label: '群信息查询',
          desc: 'QQ群：265438的信息查询'
        },
        {
          path: '/brand',
          icon: 'how_to_reg',
          label: '粉丝牌查询',
          desc: '只能查询在直播间发过言的水友'
        },
        {
          path: '/live',
          icon: 'sync',
          label: '实时直播消息',
          desc: '实时获取清晰明确的直播间消息'
        }
      ]
    }
  }
}
</script>
