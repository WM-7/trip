<template>
  <div class="tabBar">
    <template v-for="(item,index) in tabbarData" :key="index">
      <div
          class="tabbar-item"
          :class="{active:currentIndex===index}"
          @click="itemClick(item,index)"
      >
        <img v-if="currentIndex!==index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabBar";
import {getAssetURL} from "@/utils/load_assets";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const currentIndex = ref(0)
const itemClick = (item,index) =>{
  currentIndex.value=index
  router.push(item.path)
}
</script>

<style lang="less" scoped>
.tabBar {
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  border-top: 1px solid #f5f5f5;

  .tabbar-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 30px;
    }

    .text {
      font-size: 10px;
    }

    &.active {
      color: var(--primary-color);
    }
  }

}

</style>