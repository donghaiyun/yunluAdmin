<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>
<style scoped>
.my-button{
  width: 100%;
  height: 100%;
  border: none;
}
.my-button:focus{
  border: none;
  outline: none;
}
</style>
