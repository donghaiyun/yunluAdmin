import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'

// 懒加载路由
const Goods = () => import('@/views/goods/Goods')
const List = () => import('@/views/goods/List')
const Add = () => import('@/views/goods/Add')
const User = () => import('@/views/user/User')
const Info = () => import('@/views/user/Info')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    icon: 'el-icon-s-home',
    title: '主页',
    meta: {
      requiresAuth: true // 此路由是否需要登录
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    title: '登录',
    hide: true // 隐藏路由
  },
  {
    path: '/goods',
    name: 'Goods',
    title: '商品',
    icon: 'el-icon-s-goods',
    component: Goods,
    children: [
      { path: 'list', name: 'List', title: '商品列表', component: List },
      { path: 'add', name: 'Add', title: '添加商品', component: Add }
    ],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/order',
    name: 'Order',
    title: '订单',
    icon: 'el-icon-s-order',
    component: () => import('../views/order/Order.vue'),
    children: [
      {
        title: '全部订单',
        path: 'list',
        name: 'List',
        component: () => import('../views/order/List.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'User',
    title: '我的店铺',
    icon: 'el-icon-s-shop',
    component: User,
    children: [
      { path: 'info', title: '店铺信息', name: 'info', component: Info }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
