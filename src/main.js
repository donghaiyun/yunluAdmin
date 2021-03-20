import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./axios";
import './plugins/element'
import 'element-ui/lib/theme-chalk/display.css';
import './assets/css/common.css'
import MyNav from '@/components/MyNav'
import MyHeader from "@/components/MyHeader";
import MyMain from "@/components/MyMain";
Vue.use(axios); //使用二次封装的axios

//注册页头导航和main为全局组件
Vue.component('MyNav',MyNav);
Vue.component('MyHeader',MyHeader);
Vue.component('MyMain',MyMain);
Vue.config.productionTip = false;

//路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    if(store.state.isLogin){ //判断是否已登录
      next();
    }else{
      next({
        path:'/login',
        query:{
          redirect:to.fullPath //登录后跳转到的页面
        }
      })
    }
  }else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

