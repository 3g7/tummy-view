import Vue from 'vue'
import VueRouter from 'vue-router'
import Storage from '../services/Storage'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

Router.beforeEach((to, from, next) => {
  let token = Storage.get('token')
  if (!token) {
    if (to.path !== '/login' && to.path !== '/') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/index' })
    } else {
      next()
    }
  }
})

export default Router
