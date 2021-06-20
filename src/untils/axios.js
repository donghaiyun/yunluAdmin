import axios from "axios";
import qs from "qs";
import store from '../store';
import {MessageBox} from 'element-ui';
import router from "@/router";

const Axios = axios.create({
    baseURL: "/api",
    withCredentials: true
})
Axios.interceptors.request.use(
    config => {
        // console.log("进入请求拦截器...");
        if (config.method === "post" || config.method === "put") {
            //使用qs转换参数
            config.data = qs.stringify(config.data)
        }
        if (localStorage.getItem("token")) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
        }
        if (sessionStorage.getItem("token")) {
            config.headers.Authorization = 'Bearer ' + sessionStorage.getItem("token");
        }
        return config;
    },
    error => {
        console.log("===发送请求拦截器报错===")
        console.log(error);
        console.log("===end===");
        Promise.reject(error);
    }
);
Axios.interceptors.response.use(
    res => {
        if (res.data.token) {
            store.commit("setUsername", res.data.result.username);
            store.commit("setIsLogin", true);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.result.username);
        }
        return res;
    },
    error => {
        const status=error.response.status;
        switch (status) {
            case 401:
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                store.commit("setIsLogin", false);
                store.commit("setUsername", "");
                MessageBox.alert('登录信息已过期，请重新登录！', '提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        router.push('/login').then(() => {})
                    }
                });
                break;
            case 404:
                MessageBox.alert('Not Found!', '提示', {
                    confirmButtonText: '确定',
                });
                break;
            case 500:
                MessageBox.alert('服务器异常，请联系管理员或重试！', '提示', {
                    confirmButtonText: '确定',
                });
                break;
        }
    }
)
export default {
    install: function (Vue, Option) {
        Vue.prototype.axios = Axios;
    }
}
