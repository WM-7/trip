<template>
  <div class="houselist">
    <div class="title">热门精选</div>
    <div class="list">
      <template v-for="(item,index) in houseList" :key="item.data.houseId">
        <ItemV3
            v-if="item.discoveryContentType===3"
            :itemData="item.data"
            @click="itemClick(item.data)"
        />
        <ItemV9
            v-else-if="item.discoveryContentType===9"
            :itemData="item.data"
            @click="itemClick(item.data)"
        />
      </template>
    </div>

  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import {storeToRefs} from "pinia";
import ItemV3 from "@/components/houseList-item-v3/ItemV3.vue";
import ItemV9 from "@/components/houseList-item-v9/ItemV9.vue";
import {useRouter} from "vue-router";


const homeStore = useHomeStore()
const {houseList} = storeToRefs(homeStore)

const router = useRouter()
const itemClick = (item) => {
  //跳转到房屋详情页
  router.push("/detail/" + item.houseId)
}

</script>

<style lang="less" scoped>
.houselist {
  padding: 10px 20px;

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}

</style>