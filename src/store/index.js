import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    openAside:true, //控制侧边导航栏是否收缩
    username:localStorage.getItem('username')?
      localStorage.getItem('username'):'',
    isLogin:!!localStorage.getItem('token'), //是否已登录
  },
  mutations: {
    setOpenAside(state,openAside){
      state.openAside=openAside;
    },
    setUsername(state,username){
      state.username=username;
      localStorage.setItem('username',username)
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
