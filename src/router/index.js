import Vue from 'vue'
import VueRouter from 'vue-router'
import Web from '../components/Web'
import Index from '../components/web/Index'
import Admin from '../components/Admin'
import Login from '../components/admin/Login'
import Welcome from '../components/admin/Welcome'
import User from '../components/admin/user/User'
import Category from '../components/admin/category/Category'
import Tag from '../components/admin/tag/Tag'
import Team from '../components/admin/team/Team'

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
    redirect: '/index',
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
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/tag',
        component: Tag
      },
      {
        path: '/team',
        component: Team
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/admin/login' || to.path === '/home' || to.path === '/index') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/admin/login')
  next()
})

export default router
