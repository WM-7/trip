<template>
  <div class="home" ref="homeRef">

    <NavBar/>

    <div class="banner">
      <img src="@/assets/img/home/homebannerdefault.jpg" alt="">
    </div>

    <Search/>

    <Categories/>

    <SearchBar v-if="isShowSearchBar"/>

    <HouseList/>


  </div>
</template>

<script>
  export  default {
    name:'home'
  }
</script>

<script setup>

import NavBar from "@/views/home/cpns/NavBar.vue";
import Search from "@/views/home/cpns/Search.vue";
import useHomeStore from "@/stores/modules/home";
import Categories from "@/views/home/cpns/Categories.vue";
import HouseList from "@/views/home/cpns/HouseList.vue";
import home from "@/stores/modules/home";
import {computed, onActivated, onMounted, onUnmounted, ref, watch} from "vue";
import useScroll from "@/hooks/useScroll";
import SearchBar from "@/components/searchBar/SearchBar.vue";

//发送网络请求
//热门数据
const homeStore = useHomeStore()
homeStore.fetchHomeHotSuggests()
homeStore.fetchHomeCategories()
homeStore.fetchHomeHouseList()

//监听滚动到底部
//方法一
// useScroll(()=>{
//   homeStore.fetchHomeHouseList()
// })
//方法二
const homeRef = ref()
const {isReachBottom, scrollTop} = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHomeHouseList().then(() => {
      isReachBottom.value = false
    })
  }
})

// const isShowSearchBar = ref(false)
// watch(scrollTop, (newValue) => {
//   isShowSearchBar.value = newValue > 100
// })
//定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性（computed）
const isShowSearchBar = computed(()=>{
  return scrollTop.value >= 360
})

//跳转回home时，保持原来的位置
onActivated(()=>{
  homeRef.value?.scrollTo({
    top:scrollTop.value
  })
})


</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;

  .banner {
    img {
      width: 100%;
    }
  }
}

</style>