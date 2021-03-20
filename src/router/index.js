import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from "@/views/Login";
import * as path from "path";
//懒加载路由
const Goods=()=>import("@/views/goods/Goods")
const List=()=>import("@/views/goods/List");
const Add=()=>import("@/views/goods/Add")
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
    path: '/goods',
    name:'Goods',
    component: Goods,
    children:[
      {path:'add', name:'Add', component:Add},
      {path:'list', name:'List', component:List}
    ],
    meta:{
      requiresAuth:true
    }
  },
  // {
  //   path: '/releaseGoods',
  //   name:'ReleaseGoods',
  //   component: ReleaseGoods,
  //   meta:{
  //     requiresAuth:true
  //   }
  // }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
