<template>
  <div class="App">
    <h2>app</h2>
    <router-view/>
    <router-link to="/home">首页</router-link>
    <router-link to="/favor">收藏</router-link>
    <router-link to="/order">订单</router-link>
    <router-link to="/message">消息</router-link>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>

</style>