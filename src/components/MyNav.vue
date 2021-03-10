<template>
  <nav>
    <ul class="nav-tree">
      <li class="nav-item">
        <router-link to="/">
          <a-icon type="home" />
          <cite>主页</cite>
          <i class="nav-more"></i>
        </router-link>
        <dl>
          <dd></dd>
        </dl>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
name: "MyNav"
}
</script>

<style lang="scss">
nav{
  background-color: #20222A;
  color: rgba(255,255,255,.7);
}
.nav-tree{
  color: rgba(255,255,255,.7);
  .nav-item{
    a{
      color: rgba(255,255,255,.9);
    }
    .nav-more{
      display: inline-block;
      border-style: solid dashed dashed;
      border-color: #fff transparent transparent;
      overflow: hidden;
      cursor: pointer;
      transition: all .2s;
      -webkit-transition: all .2s;
      border-width: 6px;
      border-top-color: rgba(255,255,255,.7);
    }
  }
  a:hover{
    color: #fff;
  }
}

</style>
