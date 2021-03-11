<template>
  <header class="header">
    <ul class="header-left">
      <li class="el-icon-s-fold" @click="isHiddenMenu"></li>
    </ul>
  </header>
</template>

<script>
import { mapGetters,mapMutations,mapState } from 'vuex';//导入vuex
export default {
  name: "MyHeader",
  data(){
    return {
      isMenuHidden:this.menuHidden,
    }
  },
  methods:{
    isHiddenMenu(){
      if(this.menuHidden){
        this.$store.commit('setMenuHidden',false);
        // this.isMenuHidden=false;
        // console.log(this.isMenuHidden)
      }else {
        this.$store.commit('setMenuHidden',true);
        // this.isMenuHidden=true;
        // console.log(this.isMenuHidden)
      }
    }
  },
  computed:{
    ...mapState(["menuHidden"]),//解构vuex
    ...mapMutations(['setMenuHidden']),//解构vuex
  }
}
</script>

<style lang="scss">
header.header{
  z-index: 99999;
  left: 22rem;
  position: fixed;
  top: 0;
  //left: 0;
  width: 100%;
  height: 5rem;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
</style>
