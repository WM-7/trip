<template>
  <div class="city hideTabBar">

    <div class="top">
      <!--搜索框-->
      <van-search
          v-model="searchValue"
          show-action
          placeholder="城市/区域/位置"
          shape="round"
          @cancel="onCancel"
      />

      <!--tab-->
      <van-tabs v-model:active="tabActive" color="#ff9854" animated>
        <template v-for="(value,key,index) in citiesData" :key="index">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>


    <div class="content">
      <!--性能优化-->
      <template v-for="(value,key,index) in citiesData" :key="index">
        <CityGroup v-show="tabActive===key" :currentTabGroup="value"/>
      </template>

      <!--<CityGroup :currentTabGroup="currentTabGroup"/>-->
    </div>


  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import useCityStore from "@/stores/modules/city";
import {storeToRefs} from "pinia";
import CityGroup from "@/views/city/cpns/CityGroup.vue";

const router = useRouter()

// 搜索数据
const searchValue = ref("")
const onCancel = () => {
  router.back()
}

//tab数据
const tabActive = ref()

//city服务器返回数据
const cityStore = useCityStore()
cityStore.fetchCitiesData()
const {citiesData} = storeToRefs(cityStore)

//获取选中标签后的数据
//1.获取正确的key：将tabs中绑定的tabAction正确绑定
//2.根据key从cityAllData中获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed
const currentTabGroup = computed(() => citiesData.value[tabActive.value])


</script>

<style lang="less" scoped>

:deep(.van-tab--active) {
  color: var(--primary-color)
}

.city {
  .top{
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }

}


</style>