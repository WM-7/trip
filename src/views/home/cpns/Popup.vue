<template>
  <div class="Popup">
    <van-cell is-link @click="showPopup"></van-cell>
    <van-popup
        closeable
        v-model:show="showRight"
        position="right"
        :style="{ width: '60%', height: '100%' }"
    >
     <PopubContent/>
    </van-popup>
  </div>
</template>

<script setup>
import {ref} from "vue";
import PopubContent from "@/views/home/cpns/PopubContent.vue";

const showRight = ref(false);
const showPopup = () => {
  showRight.value = true;
};

</script>

<style lang="less" scoped>
.Popup{

  :deep(.van-cell__right-icon){
    color:var(--primary-color);
  }

  :deep(.van-popup__close-icon){
    font-size: 16px;
  }

}

</style>