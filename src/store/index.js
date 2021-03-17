import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    openAside:true, //控制侧边导航栏是否收缩
    username:localStorage.getItem('user')?
      localStorage.getItem('user'):'',
    isLogin:localStorage.getItem('user')?true:false, //是否已登录
  },
  mutations: {
    setOpenAside(state,openAside){
      state.openAside=openAside;
    },
    setUsername(state,username){
      state.username=username;
    },
    setIsLogin(state,isLogin){
      state.isLogin=isLogin;
    },
  },
  actions: {
  },
  modules: {
  }
})
