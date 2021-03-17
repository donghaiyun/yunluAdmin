import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
//懒加载路由
import Login from "@/views/Login";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta:{
      requiresAuth:true  //此路由是否需要登录
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
