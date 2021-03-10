import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/Home.vue')
  // },
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/newTask',
    name: 'newTask',
    component: () => import('../views/NewTask.vue')
  },
  ,
  {
    path: '/mywaitorder',
    name: 'mywaitorder',
    component: () => import('../components/mySendOrder/myWaitOrder.vue')
  },
  {
    path: '/mydelivery',
    name: 'mydelivery',
    component: () => import('../components/mySendOrder/myDelivery.vue')
  },
  {
    path: '/fayiwancheng',
    name: 'fayiwancheng',
    component: () => import('../components/mySendOrder/faYiwancheng.vue')
  }
  ,
  {
    path: '/jieyijiedan',
    name: 'jieyijiedan',
    component: () => import('../components/myJieOrder/jieYijiedan.vue')
  }
  ,
  {
    path: '/jieyiwancheng',
    name: 'jieyiwancheng',
    component: () => import('../components/myJieOrder/jieYiwancheng.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
