<template>
  <main class="main">
    <router-view/>
  </main>
</template>

<script>
export default {
  name: "MyMain",
  data() {
    return {

    }
  },
}
</script>

<style lang="scss">
.main {
  position: fixed;
  z-index: 1;
  top: 5rem;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #f2f2f2;
  transition: all .3s;
  overflow-y: auto;
}

</style>
