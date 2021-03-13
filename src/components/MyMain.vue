<template>
  <main class="main" :style="menuHidden">
    <router-view/>
  </main>
</template>

<script>
export default {
  name: "MyMain",
  data() {
    return {
      innerWidth:window.innerWidth,//窗口宽度
    }
  },
  created() {
    /*监听窗口大小变化，以调整main宽度*/
    window.addEventListener('resize',()=>{
      this.innerWidth=window.innerWidth;
    })
  },
  computed: {
    menuHidden() {
      /*计算main的宽度和left*/
      let menuWidth= this.$store.state.menuHidden?60 : 220;
      let mainWidth = this.innerWidth - menuWidth;
      return {width: mainWidth + 'px', left: menuWidth + 'px'};
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">
.main {
  position: fixed;
  z-index: 1;
  top: 5rem;
  bottom: 0;
  padding: 1.5rem;
  background-color: #f2f2f2;
  transition: all .3s;
}

main.main > .menuHidden {
  left: 6rem !important;
}
</style>
