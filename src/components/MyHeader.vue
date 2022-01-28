<template>
  <header class="header">
    <ul class="nav nav-left">
      <li class="nav-item" title="侧边伸缩"
          @click="setOpenAside(!openAside)">
        <i :class="openAside?'el-icon-s-fold':'el-icon-s-unfold'"></i>
      </li>
      <li class="nav-item el-icon-s-promotion hidden-xs-only" title="前台"></li>
      <li class="nav-item el-icon-refresh-right" title="刷新" @click="$router.go(0)"></li>
      <li class="nav-item hidden-xs-only">
        <input class="search" type="text" placeholder="搜索...">
      </li>
    </ul>
    <ul class="nav nav-right">
      <li class="nav-item el-icon-bell"></li>
      <li class="nav-item el-icon-postcard hidden-xs-only"></li>
      <li class="nav-item el-icon-collection hidden-xs-only"></li>
      <li class="nav-item el-icon-full-screen hidden-xs-only" @click="loadListener"></li>
      <li class="nav-item mine">
        <span>
          <i class="el-icon-setting"></i>
        </span>
        <div class="hidden">
          <dl class="select">
            <dd>
              <router-link class="select-item" to="#">基本资料</router-link>
            </dd>
            <dd>
              <router-link class="select-item" to="#">修改密码</router-link>
            </dd>
            <dd>
              <a class="select-item" href="javascript:void(0)"
                 @click="logOut">退出</a>
            </dd>
          </dl>
        </div>
      </li>
      <li class="nav-item el-icon-more-outline"></li>
    </ul>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex' // 导入vuex
export default {
  name: 'MyHeader',
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['setOpenAside']), // 解构vuex
    logOut () {
      /* 退出登录函数 */
      this.$store.commit('setIsLogin', false)
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
      this.$router.push('/login')
    },
    loadListener () {
      document.documentElement.webkitRequestFullscreen()
    }
  },
  computed: {
    ...mapState(['openAside', 'username'])// 解构vuex
  }
}
</script>

<style lang="scss">
header.header {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  font-size: 1.6rem;
  color: #333;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  transition: all 0.3s;

  .nav {
    padding: 0 1rem;
    display: inline-block;

    .nav-item {
      display: inline-block;
      padding: 0 2rem;
      cursor: pointer;

      .search {
        width: 18rem;
        border: none;
      }

      .search::-webkit-input-placeholder {
        color: rgba(0, 0, 0, .3);
        font-size: 1.4rem;
      }
    }
  }

  .nav-left {
    position: absolute;
    transition: left .3s;
    font-size: 1.8rem;
  }

  .nav.nav-right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    .mine {
      white-space: nowrap;
      position: relative;
      font-size: 1.4rem;
      height: 5rem;
      span {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
      }

      .hidden {
        display: none;
        position: absolute;
        z-index: 999;
        transition: all .3s;
        height: 12rem;
        top: 100%;
        left: 0;
        padding-top: 1rem;
        animation: move .2s ease;
        animation-fill-mode: both;
      }

      .select {
        background-color: #fff;
        color: #333;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        border: 1px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);

        .select-item {
          display: block;
          height: 3.6rem;
          line-height: 3.6rem;
          padding: 0 1.5rem;
          text-align: center;
        }

        .select-item:hover {
          background-color: #f2f2f2;
        }
      }
    }

    @keyframes move {
      from {
        display: none;
        top: 150%;
        opacity: 0;
      }
      to {
        display: block;
        top: 100%;
        opacity: 1;
      }
    }

    .mine:hover .hidden {
      display: block;
    }
  }
}

</style>
