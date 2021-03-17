import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from "@/views/Login";
//懒加载路由
const ProductList=()=>import("@/views/product/ProductList");
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
  {
    path: '/productList',
    name:'ProductList',
    component: ProductList,
    meta:{
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
