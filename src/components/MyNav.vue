<template>
  <nav class="nav" >
    <div class="logo">Q</div>
    <ul class="nav-tree"
        @click="navItemClick" ref="nav"
        @mouseleave="hiddenNavBar">
      <li @mouseenter="setCurrentNav(0)">
        <a class="nav-item"
           :class="{'active':navActive.home}"
           data-name="home"
           href="javascript:void(0)">
          <i class="icon el-icon-s-home"></i>
          <cite>主页</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <el-collapse-transition>
          <dl class="nav-child" v-show="navActive.home">
            <dd class="nav-child-item">
              <router-link to="/" :class="{'active':route==='/'}">概况</router-link>
            </dd>
          </dl>
        </el-collapse-transition>
      </li>
      <li @mouseenter="setCurrentNav(1)">
        <a class="nav-item"
           :class="{'active':navActive.product}"
           data-name="product"
           href="javascript:void(0)">
          <i class="icon el-icon-s-goods"></i>
          <cite>商品</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <el-collapse-transition>
          <dl class="nav-child" v-show="navActive.product">
            <dd class="nav-child-item">
              <router-link to="/productList" :class="{'active':route==='/productList'}">商品列表</router-link>
              <router-link to="#">发布商品</router-link>
              <router-link to="#">编辑商品</router-link>
            </dd>
          </dl>
        </el-collapse-transition>
      </li>
      <li @mouseenter="setCurrentNav(2)">
        <a class="nav-item"
           :class="{'active':navActive.order}"
           data-name="order"
           href="javascript:void(0)">
          <i class="icon el-icon-s-order"></i>
          <cite>订单</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <el-collapse-transition>
          <dl class="nav-child" v-show="navActive.order">
            <dd class="nav-child-item">
              <router-link to="#">订单列表</router-link>
              <router-link to="#">编辑订单</router-link>
            </dd>
          </dl>
        </el-collapse-transition>
      </li>
      <li @mouseenter="setCurrentNav(3)">
        <a class="nav-item"
           :class="{'active':navActive.client}"
           data-name="client"
           href="javascript:void(0)">
          <i class="icon el-icon-user-solid"></i>
          <cite>客户</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <el-collapse-transition>
          <dl class="nav-child" v-show="navActive.client">
            <dd class="nav-child-item">
              <router-link to="#">客户管理</router-link>
              <router-link to="#">添加客户</router-link>
            </dd>
          </dl>
        </el-collapse-transition>
      </li>
      <span class="nav-bar" :style="navBarStyle"></span>
    </ul>
  </nav>
</template>

<script>
import {mapState} from 'vuex'; //导入vuex
export default {
  name: "MyNav",
  data() {
    return {
      navActive: {
        home: true,
        product: false,
        order: false,
        client: false
      },
      currentNav: 0,
      currentNavStyle: {},
      route:'/',
    }
  },
  methods: {
    hasClass(elem, cls) {
      cls = cls || '';
      if (cls.replace(/\s/g, '').length === 0) return false;
      return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },
    navItemClick(event) {
      /*导航栏点击事件，使用事件委托*/
      let val = event.target.dataset.name;
      if (this.hasClass(event.target, 'active')) {
        //判断元素是否包含active属性，通过修改对象属性控制添加移除
        this.navActive[val] = false;
      } else {
        this.navActive[val] = true;
      }
      this.$store.commit('setOpenAside',true);
    },
    setCurrentNav(index) {
      /*记录鼠标移动导航是的状态*/
      this.currentNav = index;
      this.currentNavStyle = this.getNavStyle(index);
    },
    getNavStyle(index) {
      /*根据导航的index移动左边划线*/
      let childNodes = this.$refs.nav.childNodes;
      let top = 0; //设置下划线的top距离
      let height = 55;//设置左边划线的默认高度
      let opacity = 1;
      if (index > 0) {
        //计算上面导航的总top距离，设置左划线的下移距离
        for (let i = 0; i < index; i++) {
          top += childNodes[i].clientHeight;
        }
      }
      return {top, height, opacity};
    },
    hiddenNavBar() {
      /*设置鼠标移出ul时隐藏导航划线*/
      this.currentNavStyle.height = 0;
      this.currentNavStyle.top += 28;
      this.currentNavStyle.opacity = 0.5;
    },
  },
  computed: {
    ...mapState(["openAside"]),//解构vuex
    navBarStyle() {
      /*导航栏左侧划线style对象*/
      let style = this.currentNavStyle;
      return {top: `${style.top}px`, height: `${style.height}px`, opacity: `${style.opacity}`};
    }
  },
  watch: {
    '$route'(to) {
      /*监视路由跳转*/
      this.route = to.path;
    }
  },

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
  overflow: hidden;

  .logo {
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }

  .nav-tree {
    width: 22rem;
    position: relative;
    color: rgba(255, 255, 255, .7);

    .nav-item {
      overflow:hidden;
      height: 5.5rem;
      display: block;
      position: relative;
      line-height: 5.5rem;
      padding-left: 4.5rem;
      padding-right: 3rem;
    }

    .nav-item i, .nav-item cite {
      /*因事件委托需求，防止子元素遮挡父级元素，设置nav-item子元素属性穿透*/
      pointer-events: none;
    }
    .nav-child {
      .nav-child-item{
        padding: 0.5rem 0;
        background-color: rgba(0, 0, 0, .3);
        a {
          display: block;
          line-height: 4rem;
          padding-left: 4.5rem;
        }
        a.active {
          color: #fff;
          background-color: #009688;
        }
      }
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
  }

  .icon {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .el-icon-caret-bottom {
    font-size: 1.8rem;
    position: absolute;
    top: 50%;
    right: 1.2rem;
    transition: all .2s;
    transform: translateY(-50%);
  }

  .nav-item:hover {
    color: #fff;
  }

  .nav-item.active {
    color: #fff;
  }

  .nav-item.active .el-icon-caret-bottom {
    transform: rotate(-180deg) translateY(10px);
    color: rgba(255, 255, 255);
  }
}


</style>
