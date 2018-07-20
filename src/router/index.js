import Vue from 'vue'
import Router from 'vue-router'
import Device from '@/components/device/Device.vue'
import UserInfo from '@/components/userinfo/UserInfo.vue'
import Main from '@/components/Main.vue'
import Login from '@/components/login/Login.vue'

Vue.use(Router)

const deviceRoutes = {
  path: 'device',
  name: 'Device',
  component: Device
}

const userRoutes = {
  path: 'user',
  name: 'User',
  component: UserInfo
}

const mainRoutes = {
  path: 'main',
  name: 'Main',
  component: Main
}

const loginRoutes = {
  path: 'login',
  name: 'Login',
  component: Login
}

const mRouter = {
  path: '/main',
  component: Main,
  redirect: {name: 'Device'},
  children: [
    userRoutes,
    deviceRoutes,
    mainRoutes
  ]
}

const routes = [
  {
    path: '/',
    component: {
      template: '<router-view></router-view>'
    },
    redirect: {name: 'Login'},
    children: [
      mRouter,
      loginRoutes
    ]
  }
]

const router = new Router({
  // mode: 'history',
  routes: routes
})

export default router
