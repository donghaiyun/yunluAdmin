<template>
  <div id="app" :class="openAside?'openAside':'closeAside'">
    <div v-show="$route.name!=='Login'">
      <my-header></my-header>
      <my-nav></my-nav>
    </div>
    <my-main></my-main>
    <!--辅助元素-移动设备时的遮罩-->
    <div class="mask" @click="$store.commit('setOpenAside',false)"></div>
  </div>
</template>
<script>

export default {
  name: "Index",
  data(){
    return {
      openMask:false
    }
  },
  computed:{
    openAside() {
      return this.$store.state.openAside;
    }
  },
  created() {
    if(window.innerWidth<992) this.$store.commit('setOpenAside',false);//小屏时默认关闭遮罩
  }
}
</script>
<style lang="scss">
</style>
