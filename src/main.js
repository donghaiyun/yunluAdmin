import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import MyNav from '@/components/MyNav'

Vue.component('MyNav',MyNav);
Vue.config.productionTip = false
Vue.use(antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
