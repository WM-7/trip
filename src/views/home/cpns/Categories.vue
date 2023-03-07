<template>
  <div class="categories">
    <template v-for="(item,index) in categories">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <span class="text">{{item.title}}</span>
      </div>
    </template>
  </div>

  <div class="section">
    民宿预定服务由途家网提供
  </div>

</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import {storeToRefs} from "pinia";

const homeStore = useHomeStore()
const {categories} = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.categories{
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  &::-webkit-scrollbar {
    display: none;
  }

  .item{
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70px;

    img{
      width: 30px;
    }

    .text{
      font-size: 12px;
      margin-top: 8px;
    }
  }
}

.section{
  padding: 0px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #ccc;
  height: 36px;
  justify-content: center;
  font-size: 9px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
}

</style>