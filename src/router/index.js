import Vue from 'vue'
import VueRouter from 'vue-router'
import Web from '../components/Web'
import Index from '../components/web/Index'
import Admin from '../components/Admin'
import Login from '../components/admin/login/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: Index
  },
  {
    path: '/admin/login',
    component: Login
  },
  {
    path: '/home',
    component: Web,
    children: [
      {
        path: '/index',
        component: Index
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '/index',
        component: Index
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
