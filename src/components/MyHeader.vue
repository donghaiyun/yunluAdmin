<template>
  <header class="header">
    <ul class="nav nav-left" :class="menuHidden?'menuHidden':''">
      <li class="nav-item" @click="isHiddenMenu">
        <i v-show="!menuHidden" class="el-icon-s-fold"></i>
        <i v-show="menuHidden" class="el-icon-s-unfold"></i>
      </li>
<!--      <li v-show="menuHidden" class="nav-item el-icon-s-unfold" @click="isHiddenMenu"></li>-->
      <li class="nav-item el-icon-s-promotion"></li>
      <li class="nav-item el-icon-refresh-right"></li>
      <li class="nav-item"><input class="search" type="text" placeholder="搜索..."></li>
    </ul>
    <ul class="nav nav-right">
      <li class="nav-item el-icon-bell"></li>
      <li class="nav-item el-icon-setting"></li>
      <li class="nav-item el-icon-collection"></li>
      <li class="nav-item el-icon-full-screen"></li>
    </ul>
  </header>
</template>

<script>
import {mapMutations, mapState} from 'vuex'; //导入vuex
export default {
  name: "MyHeader",
  data() {
    return {
      isMenuHidden: this.menuHidden,
    }
  },
  methods: {
    ...mapMutations(['setMenuHidden']),//解构vuex
    isHiddenMenu() {
      if (this.menuHidden) {
        this.setMenuHidden(false);
      } else {
        this.setMenuHidden(true);
      }
    }
  },
  computed: {
    ...mapState(["menuHidden"]),//解构vuex
  }
}
</script>

<style lang="scss">
header.header {
  z-index: 99999;
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  font-size: 1.6rem;
  color: #333;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  transition: left 0.3s;

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
  .nav-left{
    position: absolute;
    left: 22rem;
    transition: left .3s;
  }
  .nav.nav-right{
    float: right;
  }
}

header.header>.nav-left.menuHidden {
  left: 6rem;
}
</style>
