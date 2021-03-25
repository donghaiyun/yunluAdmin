import axios from "axios";
import qs from "qs";
import store from './store';

const Axios=axios.create({
  baseURL:"/api",
  withCredentials:true
})
Axios.interceptors.request.use(
  config=>{
    // console.log("进入请求拦截器...");
    if(config.method==="post" || config.method==="put"){
      config.data=qs.stringify(config.data)
    }
    if(localStorage.getItem("token")){
      config.headers.token=localStorage.getItem("token");
    }
    if(sessionStorage.getItem("token")){
      config.headers.token=sessionStorage.getItem("token");
    }
    return config;
  },
  error=>{
    console.log("===发送请求拦截器报错===")
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  res=>{
    // console.log("触发响应拦截器...")
    if(res.data.status===403){
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      store.commit("setIsLogin",false);
      store.commit("setUsername","");
    }else if(res.data.code===-1){
      store.commit("setIsLogin",false);
      store.commit("setUsername","");
      alert(res.data.msg+" 请先登录 !");
    }else if(res.data.token){
      store.commit("setUsername",res.data.result.username);
      store.commit("setIsLogin",true);
      // if(res.remember==="true"){  //是否勾选记住我
      //   localStorage.setItem("token",res.data.token);
      // }else{
      //   sessionStorage.setItem("token",res.data.token);
      // }
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",res.data.result.username);
    }
    return res;
  },
  error=>{

  }
)
export default {
  install: function(Vue, Option){
    Vue.prototype.axios=Axios;
  }
}
