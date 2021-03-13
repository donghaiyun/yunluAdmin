import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import 'element-ui/lib/theme-chalk/display.css';
import MyNav from '@/components/MyNav'
import MyHeader from "@/components/MyHeader";
import MyMain from "@/components/MyMain";
Vue.component('MyNav',MyNav);
Vue.component('MyHeader',MyHeader);
Vue.component('MyMain',MyMain);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

