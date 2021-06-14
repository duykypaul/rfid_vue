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
  console.log('router.beforeEach: ', store.state.user)
  let { userInfo } = store.state.user
  if (!userInfo) {
    userInfo = await store.dispatch('user/getUserInfo')
    if (!userInfo) {
      if (to.path === '/') next({ path: '/login' })
    }
    next() // xóa dòng này nếu kích hoạt check permission

    // bỏ comment đoạn này để kích hoạt check permission
    // const { permissions: curr = [] } = userInfo || {};
    // if (!to.path.startsWith("/admin")) {
    //   next();
    //   return;
    // }
    // if (to.path === "/admin/login") {
    //   if (userInfo) {
    //     next({ path: "/admin" });
    //     return;
    //   }
    //   next();
    //   return;
    // }
    // if (to.path.startsWith("/admin/") || to.path === "/admin") {
    //   if (userInfo) {
    //     if (!permissions || permissions.every((x) => curr.includes(x))) {
    //       next();
    //       return;
    //     } else {
    //       next({ path: `/admin/403` });
    //       return;
    //     }
    //   } else {
    //     next(`/admin/login?redirect=${to.path}`);
    //     return;
    //   }
    // }
  } else {
    next() // xóa dòng này nếu kích hoạt check permission

    // bỏ comment đoạn này để kích hoạt check permission
    // const { permissions: curr = [] } = userInfo || {};
    // if (!to.path.startsWith("/admin")) {
    //   next();
    //   return;
    // }
    // if (to.path === "/admin/login") {
    //   if (userInfo) {
    //     next({ path: "/admin" });
    //     return;
    //   }
    //   next();
    //   return;
    // }
    // if (to.path.startsWith("/admin/") || to.path === "/admin") {
    //   if (userInfo) {
    //     if (!permissions || permissions.every((x) => curr.includes(x))) {
    //       next();
    //       return;
    //     } else {
    //       next({ path: `/admin/403` });
    //       return;
    //     }
    //   } else {
    //     next(`/admin/login?redirect=${to.path}`);
    //     return;
    //   }
    // }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
