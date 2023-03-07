<template>
  <div class="CityGroup">

    <van-index-bar highlight-color="#ff9854" :index-list="indexList">
      <!--热门数据-->
      <van-index-anchor index="热门数据"/>
      <div class="hotCity">
        <template v-for="(city,index) in currentTabGroup.hotCities" :key="index">
          <div class="cityItem" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <!--列表数据-->
      <template v-for="(item,index) in currentTabGroup.cities" :key="index">
        <van-index-anchor :index="item.group"/>
        <template v-for="(iten, indey) in item.cities" :key="iten">
          <van-cell :title="iten.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>

  </div>
</template>

<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";
import useCityStore from "@/stores/modules/city";

const props = defineProps({
  currentTabGroup: {
    type: Object,
    default: () => ({})
  }
})

// 动态的索引
const indexList = computed(() => {
  const list = props.currentTabGroup.cities.map(item => item.group)
  list.unshift("#")
  return list
})

//数据回显
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city)=>{
  // console.log(city)

  //将点击的当前城市存储到pinia中
  cityStore.currentCity = city

  router.back()
}

</script>

<style lang="less" scoped>


.hotCity {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 15px;
  padding-right: 30px;

  .cityItem {
    width: 68px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    margin-top: 15px;
    background-color: #fff4ec;
  }
}


</style>