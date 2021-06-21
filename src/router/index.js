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
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'common'
    },
    component: () => import('@/views/login')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/About')
  },
  {
    path: '*',
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
  console.log('userInfo: ', userInfo)
  console.log('store.state.user: ', store.state.user)
  if (!userInfo) {
    userInfo = await store.dispatch('user/getUserInfo')
    console.log('52 userInfo: ', userInfo)
    if (!userInfo) {
      next({ path: '/login' })
    } else {
      if (to.path === '/login') {
        next({ path: '/' })
      }
      next()
    }
  } else {
    console.log('to.path: ', to.path)
    // if (to.path === '/login') {
    //   next({ path: '/' })
    // }
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
