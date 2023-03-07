<template>
  <div class="App">

    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <!--<TabBar v-if="!route.meta.hideTabBar"/>-->
    <TabBar/>
    <Loading/>
  </div>
</template>

<script setup>
import TabBar from "@/components/tabBar/TabBar.vue";
import {useRoute} from "vue-router";
import Loading from "@/components/loading/Loading.vue";

const route = useRoute()


</script>

<style lang="less" scoped>

</style>