<template>
  <nav class="nav">
    <div class="logo">Q</div>
    <ul class="nav-tree"
        :class="menuHidden?'hidden':''"
        @click="navItemClick" ref="nav"
        @mouseleave="hiddenNavBar">
      <li @mouseenter="setCurrentNav(0)">
        <a class="nav-item"
           :class="navActive.home?'active':''"
           data-name="home"
           href="javascript:void(0)">
          <i class="icon el-icon-s-home"></i>
          <cite>主页</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <dl class="nav-child">
          <dd class="nav-child-item">
            <router-link to="#">概况</router-link>
          </dd>
        </dl>
      </li>
      <li @mouseenter="setCurrentNav(1)">
        <a class="nav-item"
           :class="navActive.product?'active':''"
           data-name="product"
           href="javascript:void(0)">
          <i class="icon el-icon-s-goods"></i>
          <cite>商品</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <dl class="nav-child">
          <dd class="nav-child-item">
            <router-link to="#">商品列表</router-link>
            <router-link to="#">发布商品</router-link>
            <router-link to="#">编辑商品</router-link>
          </dd>
        </dl>
      </li>
      <li @mouseenter="setCurrentNav(2)">
        <a class="nav-item"
           :class="navActive.order?'active':''"
           data-name="order"
           href="javascript:void(0)">
          <i class="icon el-icon-s-order"></i>
          <cite>订单</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <dl class="nav-child">
          <dd class="nav-child-item">
            <router-link to="#">订单列表</router-link>
            <router-link to="#">编辑订单</router-link>
          </dd>
        </dl>
      </li>
      <li @mouseenter="setCurrentNav(3)">
        <a class="nav-item"
           :class="navActive.client?'active':''"
           data-name="client"
           href="javascript:void(0)">
          <i class="icon el-icon-user-solid"></i>
          <cite>客户</cite>
          <i class="el-icon-caret-bottom"></i>
        </a>
        <dl class="nav-child">
          <dd class="nav-child-item">
            <router-link to="#">客户管理</router-link>
            <router-link to="#">添加客户</router-link>
          </dd>
        </dl>
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
      currentNavStyle: {}

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
    }
  },
  computed: {
    ...mapState(["menuHidden"]),//解构vuex
    navBarStyle() {
      let style = this.currentNavStyle;
      return {top: `${style.top}px`, height: `${style.height}px`, opacity: `${style.opacity}`};
    }
  }
}
</script>

<style lang="scss">
nav.nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #20222A;
  color: rgba(255, 255, 255, .7);

  //隐藏左边导航部分按钮
  .hidden > li > a > cite,
  .hidden > li > a > .el-icon-caret-bottom,
  .hidden > li > dl > dd {
    display: none;
  }

  ul.hidden {
    width: 6rem;
    transition: all .3s;
  }

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
    transition: all .3s;

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
      /*因事件委托需求，设置nav-item子元素属性穿透*/
      pointer-events: none
    }

    .nav-child {
      display: none;
      .nav-child-item > a {
        display: block;
        line-height: 4rem;
        padding-left: 4.5rem;
        background-color: rgba(0, 0, 0, .3);
      }

      .nav-child-item > a.active {
        color: #fff;
        background-color: #009688;
      }
    }

    .nav-bar {
      width: 0.5rem;
      z-index: 999;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #009688;
      transition: all .2s;
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

  .nav-item.active + .nav-child {
    display: block;
  }

  .nav-item.active .el-icon-caret-bottom {
    transform: rotate(-180deg) translateY(10px);
    color: rgba(255, 255, 255);
  }
}

</style>
