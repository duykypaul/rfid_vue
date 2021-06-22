import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

NProgress.configure({ showSpinner: false })

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'common',
      requiresAuth: false
    },
    component: () => import('@/views/login')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/About')
  },
  {
    path: '*',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let { userInfo } = store.state.user
  if (!userInfo) {
    userInfo = await store.dispatch('user/getUserInfo')
    if (!userInfo) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({ path: '/login' })
      } else next()
    } else {
      if (to.name === 'Login') {
        next({ path: from.path })
      } else next()
    }
  } else {
    if (to.name === 'Login') {
      next({ path: from.path })
    } else next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
