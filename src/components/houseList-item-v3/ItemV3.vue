<template>
  <div class="ItemV3">
    <div class="itemInner">
      <img :src="itemData?.image?.url" alt="">
      
      <div class="infos">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span class="text">{{ itemData.location }}</span>
        </div>

        <div class="houseName">{{ itemData.houseName }}</div>
        <div class="summaryText">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="finalPrice">¥ {{ itemData.finalPrice }}</div>
          <div class="productPrice">¥ {{ itemData.productPrice }}</div>
          <div class="tip" v-if="itemData.priceTipBadge">
            {{ itemData?.priceTipBadge?.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="less" scoped>
.ItemV3 {
  width: 50%;

  .itemInner {
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
    }

    .infos {
      padding: 8px 10px 0px 8px;
      color: #666;
      font-size: 12px;

      .location {
        display: flex;
        align-items: center;

        img {
          width: 12px;
          height: 12px;
        }

        .text {
          margin-left: 2px;
          font-size: 12px;
          color: #666;
        }
      }

      .houseName {
        margin: 5px 0;
        font-size: 14px;
        color: #333;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        align-items: flex-start;

        margin: 4px 0;

        .finalPrice {
          color: #ff9645;
          font-size: 14px;
        }

        .productPrice {
          margin: 0 3px;
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
        }

        .tip {
          background-image: linear-gradient(270deg, #f66, #ff9f9f);
          color: #fff;
          padding: 0 5px;
          border-radius: 8px;
        }
      }

    }
  }
}
</style>