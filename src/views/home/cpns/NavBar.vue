<template>
  <div class="NavBar">
    <img src="@/assets/img/home/trip.webp" alt="">
    <Popup/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Popup from "@/views/home/cpns/Popup.vue";

const showRight = ref(true)

</script>

<style lang="less" scoped>
.NavBar {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 85px;
  }
}
</style>