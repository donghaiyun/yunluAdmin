<template>
  <nav class="nav">
    <div class="logo">{{ username }}</div>
    <el-menu default-active="/"
             background-color="#20222A"
             text-color="#f2f2f2"
             active-text-color="#fff"
             class="el-menu-vertical-demo"
             :collapse="!this.$store.state.openAside"
             :router=true
             @open="bindNavbarEvent"
             @mouseleave="hiddenNavBar"
             @select="selectNav"
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-submenu v-for="(route,index) of routers"
                  :key="index"
                  :index="route.path"
                  @mouseenter="setCurrentNav(index)"
      >
        <template slot="title">
          <i :class="route.icon"></i>
          <span slot="title" v-text="route.title"></span>
        </template>
        <el-menu-item
            v-for="(routeChild,index) of route.children"
            :key="index"
            :index="routeChild.path">{{ routeChild.title }}
        </el-menu-item>
      </el-submenu>
      <span class="nav-bar" :style="navBarStyle"></span>
    </el-menu>
  </nav>
</template>

<script>
import { mapState } from 'vuex' // 导入vuex
import router from '../router'

export default {
  name: 'MyNav',
  data () {
    return {
      routers: [],
      navActive: {},
      currentNav: 0,
      currentNavStyle: {},
      route: '/'
    }
  },
  methods: {
    selectNav () {
      if (window.innerWidth < 992) {
        // 小屏时，路由跳转后关闭导航栏
        this.$store.commit('setOpenAside', false)
      }
    },
    setCurrentNav (index, childNodes) {
      /* 记录鼠标移动导航是的状态 */
      this.currentNav = index
      this.currentNavStyle = this.getNavStyle(index, childNodes)
    },
    getNavStyle (index, childNodes) {
      /* 根据导航的index移动左边划线 */
      let top = 0 // 设置下划线的top距离
      const height = 55// 设置左边划线的默认高度
      const opacity = 1
      if (index > 0) {
        // 计算上面导航的总top距离，设置左划线的下移距离
        for (let i = 0; i < index; i++) {
          top += childNodes[i].clientHeight
        }
      }
      return { top, height, opacity }
    },
    hiddenNavBar () {
      /* 设置鼠标移出ul时隐藏导航划线 */
      this.currentNavStyle.height = 0/**/
      this.currentNavStyle.top += 28
      this.currentNavStyle.opacity = 0.5
    },
    showNavs () {
      /* 展示导航栏函数 */
      const { routes } = router.options
      this.routers = routes.filter((item, index) => {
        if (item.children) {
          item.children.forEach(childItem => {
            childItem.path = item.path + '/' + childItem.path
          })
        }
        if (!item.hide && index !== 0) {
          return item
        }
      })
    },
    bindNavbarEvent () {
      const menubar = document.querySelector('.el-menu')
      menubar.addEventListener('mouseleave', this.hiddenNavBar)
      const submenu = menubar.childNodes
      submenu.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
          this.setCurrentNav(index, submenu)
        })
      })
      menubar.addEventListener('click', () => {
        if (!this.openAside && window.innerWidth >= 992) {
          this.$store.commit('setOpenAside', true)
        }
      })
    }
  },
  computed: {
    ...mapState(['openAside', 'username']), // 解构vuex
    navBarStyle () {
      /* 导航栏左侧划线style对象 */
      const style = this.currentNavStyle
      return { top: `${style.top}px`, height: `${style.height}px`, opacity: `${style.opacity}` }
    }
  },
  mounted () {
    this.bindNavbarEvent()
  },
  created () {
    this.showNavs()
  },
  watch: {
    '$route' (to) {
      /* 监视路由跳转 */
      this.route = to.path
      this.bindNavbarEvent()
    },
    'openAside' () {
      /* 打开菜单时重新绑定事件 */
      setTimeout(this.bindNavbarEvent, 500)
    }
  }
}
</script>

<style lang="scss">
nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 9999999;
  background-color: #20222A;
  color: rgba(255, 255, 255, .7);
  transition: all .3s;
  overflow-x: hidden;
  overflow-y: auto;

  .logo {
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }

  .nav-bar {
    width: 0.5rem;
    z-index: 999;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #009688;
    transition: all .3s;
  }

  .el-menu {
    border-right: none;
  }

  .el-menu-item.is-active {
    background-color: #009688 !important;
  }
}

nav::-webkit-scrollbar {
  width: 0;
}
</style>
