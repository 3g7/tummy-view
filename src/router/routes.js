
const routes = [
  {
    path: '/',
    component: () => import('pages/login/Login.vue')
  },
  {
    path: '/login',
    component: () => import('pages/login/Login.vue')
  },
  {
    path: '/index',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/danmu',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/danmu/Danmu.vue') }
    ]
  },
  {
    path: '/gift',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/gift/Gift.vue') }
    ]
  },
  {
    path: '/blackres',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/blackres/BlackRes.vue') }
    ]
  },
  {
    path: '/rank',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/rank/Rank.vue') }
    ]
  },
  {
    path: '/uenter',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/uenter/Uenter.vue') }
    ]
  },
  {
    path: '/live',
    component: () => import('pages/live/Live.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
