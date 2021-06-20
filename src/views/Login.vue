<template>
  <div class="login-fluid">
    <div class="login-main">
      <div class="login-header">
        <h1>Admin</h1>
      </div>
      <div class="login-body">
        <!-- 登录窗口-->
        <form @submit.prevent="onLogin" class="login-form" v-if="isLogin">
          <label class="form-item username">
            <i class="icon el-icon-user"></i>
            <input type="text" v-model="userLogin.phone"
                   name="username" placeholder="手机号/邮箱">
          </label>
          <label class="form-item password">
            <i class="icon el-icon-unlock"></i>
            <input type="password" v-model="userLogin.password"
                   placeholder="密码">
          </label>
          <div class="remember">
            <div class="text" @click="rememberMe=!rememberMe">
              <i class="checkbox" :class="{'el-icon-check':rememberMe}"></i>
              <span>记住密码</span>
            </div>
            <div class="text"><span>忘记密码？</span></div>
          </div>
          <input type="submit" value="登录" class="form-item submit"
                 v-loading.fullscreen.lock="fullscreenLoading">
          <div class="form-btns">
          <span class="btn-left">
            社交账号注册：
            <a class="qq" href="javascript:void(0)"></a>
            <a class="wechat" href="javascript:void(0)"></a>
            <a class="microBlog" href="javascript:void(0)"></a>
          </span>
            <span class="btn-right" @click="isLogin=!isLogin">注册账号</span>
          </div>
        </form>
        <!-- 注册窗口-->
        <form @submit.prevent="onRegister" class="register-form" v-else>
          <label class="form-item username">
            <i class="icon el-icon-mobile-phone"></i>
            <input type="text" v-model="userRegister.phone"
                   name="username" placeholder="手机">
          </label>
          <label class="form-item password">
            <i class="icon el-icon-unlock"></i>
            <input type="password" v-model="userRegister.password"
                   placeholder="密码">
          </label>
          <label class="form-item password">
            <i class="icon el-icon-unlock"></i>
            <input type="password" v-model="userRegister.relPassword"
                   placeholder="确认密码">
          </label>
          <label class="form-item username">
            <i class="icon el-icon-user"></i>
            <input type="text" v-model="userRegister.username"
                   placeholder="昵称">
          </label>
          <div class="remember">
            <div class="text" @click="agreement=!agreement">
              <i class="checkbox" :class="{'el-icon-check':agreement}"></i>
              <span>同意用户协议</span>
            </div>
          </div>
          <input type="submit" value="注册" class="form-item submit"
                 v-loading.fullscreen.lock="fullscreenLoading">
          <div class="form-btns">
          <span class="btn-left">
            社交账号注册：
            <a class="qq" href="javascript:void(0)"></a>
            <a class="wechat" href="javascript:void(0)"></a>
            <a class="microBlog" href="javascript:void(0)"></a>
          </span>
            <span class="btn-right" @click="isLogin=!isLogin">用已有账号登入</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      fullscreenLoading: false,//加载中
      isLogin: true,  //切换登录注册窗口
      rememberMe: false,  //是否记住密码
      agreement: false,  //是否同意用户协议
      userLogin: {
        phone: '',  //此变量phone可以是手机号也可以是邮箱
        password: ''
      },
      userRegister: {
        phone: '',
        password: '',
        relPassword: '',
        username: ''
      }
    }
  },
  methods: {
    onLogin() {
      /*登录函数*/
      const {phone,password} = this.userLogin

      if (!phone) {
        this.$message.error('手机号或邮箱不允许为空！');
        return;
      } else if (!password) {
        this.$message.error( '密码不允许为空！');
        return;
      }
      this.fullscreenLoading = true; //开启loading遮罩
      (async ()=>{
        const {data:res}=await this.axios.post('/auth/login', {phone, password})
        if (res.code === 200) {
          this.$notify({
            title: 'ok',
            message: '登录成功',
            type: 'success',
            duration:2000
          });
          await this.$router.push(this.$route.query.redirect|| '/');
        } else if (res.code === 401) {
          this.$message.error('用户名或密码错误！');
        }
        this.fullscreenLoading = false; //关闭loading遮罩
      })()
    },
    onRegister() {
      /*注册函数*/
      let {phone,password,relPassword,username,nickName}=this.userRegister;
      let errMsg = '';
      if (password !== relPassword) errMsg = '两次输入密码不一致！';
      if (!password) errMsg = '密码不允许为空！';
      if (!/^1[3-9]\d{9}$/.test(phone)) errMsg = '请检查手机号是否正确！';
      if (!phone) errMsg = '手机号不允许为空！';
      if (!username) username = phone.slice(0, 3) + '****' + phone.slice(7);//如果昵称为空，设置默认昵称
      if (errMsg !== ''){
        return this.$message.error(errMsg);
      }
      this.fullscreenLoading = true;//开启loading遮罩
      (async ()=>{
        const {data:res}=await this.axios.post('/user/register', {phone, password, username,relPassword})
        if (res.code === 200) {
          this.$notify({
            title: 'ok',
            message: '注册成功',
            type: 'success',
            duration:2000
          });
          this.isLogin=true;
        } else if (res.code === 401) {
          this.$message.error( '此手机号已存在！');
        }else{
          this.$message.error( '注册失败！');
        }
        this.fullscreenLoading = false; //关闭loading遮罩
      })()
    },
  },
  watch:{
    //监听user对象内属性，当修改手机号时清空输入框内密码
    'userLogin.username'(){
      this.userLogin.password="";
    },
    'userRegister.phone'(){
      this.userRegister.password="";
      this.userRegister.relPassword="";
    }
  }
}
</script>

<style lang="scss">
.login-fluid {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: #666;
  background-color: #f2f2f2;
  overflow-y: auto;

  .login-main {
    width: 35rem;
    margin: 0 auto;
    padding-top: 6rem;

    .login-header {
      h1 {
        text-align: center;
        font-size: 3rem;
      }
    }

    .login-body {
      padding: 3rem 0;
      margin: 0 auto;

      .form-item {
        position: relative;
        display: block;
        background-color: #fff;
        color: #333333;
        margin: 2rem 0;
        border-radius: 3px;
        border: 1px solid #d2d2d2;
        height: 3.5rem;
        line-height: 3.5rem;

        .icon {
          color: rgba(0, 0, 0, .4);
          position: absolute;
          left: 1rem;
          top: 20%;
          font-size: 1.8rem;
        }

        input {
          border: none;
          width: 31rem;
          padding-left: 3.6rem;
          height: 3.3rem;
        }
      }

      .remember {
        padding: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .checkbox {
          display: inline-block;
          width: 1.8rem;
          height: 1.8rem;
          background-color: #fff;
          border: 1px solid #d2d2d2;
          color: #5FB878;
          font-size: 2rem;
          font-weight: bolder;
          border-radius: 4px;
          cursor: pointer;
          margin: 0.3rem 0.8rem 0 0;
        }

        .checkbox:hover {
          border: 1px solid #5FB878;
        }

        .text {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
      }

      .submit {
        width: 100%;
        background-color: #009688;
        color: #fff;
      }

      .submit:hover {
        opacity: .8;
      }

      .form-btns {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn-left {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .btn-right {
          color: #009688;
          cursor: pointer;
        }

        .qq, .wechat, .microBlog {
          display: inline-block;
          width: 2.6rem;
          height: 2.6rem;
          background-image: url("../assets/image/icon/social.jpg");
          background-repeat: no-repeat;
          cursor: pointer;
        }

        .qq {
          background-position: 0 -5px;
        }

        .wechat {
          background-position: -31px -5px;
        }

        .microBlog {
          background-position: -62px -5px;
        }
      }
    }
  }
}
</style>
