<template>
  <div id="app">
    <my-header></my-header>
    <my-nav></my-nav>
    <my-main></my-main>
  </div>
</template>

<style lang="scss">
body, html, #app {
  height: 100%;
}
html{
  font-size:62.5%;
}
body{
  font-size: 1.4rem;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
a{
  color:inherit;
}
a:focus{
  border: none;
  outline:none;
}
</style>
