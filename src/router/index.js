import Vue from 'vue'
import VueRouter from 'vue-router'
import Web from '../components/Web'
import DrawClass from '../components/web/DrawClass'
import Admin from '../components/Admin'
import Login from '../components/admin/Login'
import Welcome from '../components/admin/Welcome'
import User from '../components/admin/user/User'
import Category from '../components/admin/category/Category'
import Tag from '../components/admin/tag/Tag'
import Team from '../components/admin/team/Team'
import SeeMore from '../components/web/SeeMore'
import TagTeams from '../components/web/TagTeams'
import Index from '../components/web/Index'
import Site from '../components/admin/site/Site'
import SiteNav from '../components/web/SiteNav'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: DrawClass
  },
  {
    path: '/admin/login',
    component: Login
  },
  {
    path: '/home',
    component: Web,
    redirect: '/draw-class',
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/draw-class',
        component: DrawClass
      },
      {
        path: '/more',
        component: SeeMore
      },
      {
        path: '/tag-teams',
        component: TagTeams
      },
      {
        path: '/site-nav',
        component: SiteNav
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
      },
      {
        path: '/site',
        component: Site
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const directAccess = ['/admin/login', '/home', '/index', '/draw-class', '/more', '/tag-teams']
  if (directAccess.indexOf(to.path) !== -1) {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/admin/login')
  next()
})

export default router
