<template>
  <div class="searchBar">
    <div class="search">
      <div class="select-time">
        <div class="start">
          <span>住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="end">
          <span>离</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>

      <div class="select-content">
        <div class="keyword">
          <span>关键字/位置/民宿名</span>
        </div>

        <div class="right">
          <i class="icon-search"></i>
        </div>
      </div>


    </div>

  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import useMainStore from "@/stores/modules/main";
import {computed} from "vue";
import {formatMonthDay} from "@/utils/format_date";

const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value, "MM.DD"))
const endDateStr = computed(() => formatMonthDay(endDate.value, "MM.DD"))

</script>

<style lang="less" scoped>
.searchBar {
  position: fixed;
  z-index: 9;
  right: 0;
  left: 0;
  top: 0;
  height: 45px;
  padding: 16px 16px 10px 16px;
  background: #fff;

  .search {
    display: flex;
    align-items: center;
    font-size: 12px;

    color: #999;
    border-radius: 6px;
    background: #f2f4f6;

    .select-time {
      padding: 6px 9px 6px 6px;
      border-right: 1px solid #fff;

      .start {
        margin-bottom: 3px;
      }

      .time {
        color: #666;
        margin-left: 3px;
      }

      .end {
        position: relative;
      }

      .end .time::after {
        content: " ";
        width: 0;
        height: 0;
        border: 4px solid #666;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        bottom: 0px;
        right: -12px;
      }
    }

    .select-content {
      display: flex;
      flex: 1;
      line-height: 45px;
      position: relative;

      .keyword {
        margin-left: 10px;
      }

      .right {
        display: flex;
        align-items: center;

        .icon-search {
          width: 24px;
          height: 24px;
          display: inline-block;

          background-image: url(../../assets/img/home/home-sprite.png);
          background-position: -29px -151px;
          background-size: 207px 192px;

          position: absolute;
          right: 10px;

        }
      }

    }
  }
}


</style>