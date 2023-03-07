<template>
  <div class="tabBar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item,index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <template #icon="props">
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)"/>
            <img v-else :src="getAssetURL(item.imageActive)"/>
          </template>
          <span class="text">{{ item.text }}</span>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabBar";
import {getAssetURL} from "@/utils/load_assets";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

//监听路由改变时，对应的图片切换
const currentIndex = ref(0)
const route = useRoute()
watch(route, (newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})

</script>

<style lang="less" scoped>

</style>