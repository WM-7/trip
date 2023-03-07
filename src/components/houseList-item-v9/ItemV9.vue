<template>
  <div class="ItemV9">
    <div class="itemInner">
      <img :src="itemData?.image?.url" alt="">
      <div class="infos">
        <div class="summaryText">{{ itemData.summaryText }}</div>
        <div class="houseName">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate :model-value="itemScore" color="#fff" :size="10" readonly allow-half/>
          <div class="finalPrice">¥ {{ itemData?.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const itemScore = computed(() => {
  return Number(props.itemData.commentScore)
})

</script>

<style lang="less" scoped>
.ItemV9 {
  width: 50%;

  .itemInner {
    position: relative;
    background: #fff;
    border-radius: 6px;
    margin: 5px;
    overflow: hidden;

    img {
      width: 100%;
    }

    .infos {
      position: absolute;
      bottom: 0px;
      padding: 8px 10px;
      color: #fff;

      .summaryText {
        font-size: 12px;
      }

      .houseName {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .finalPrice{
          font-size: 12px;
        }
      }

    }
  }
}

</style>