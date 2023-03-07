<template>
  <div class="content">
    <div @click="homeClick">
      <van-icon name="wap-home-o"/>
      <span>首页</span>
    </div>
    <div>
      <van-icon name="contact"/>
      <span>登录/注册</span>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router =useRouter()
const homeClick = ()=>{

}
</script>

<style lang="less" scoped>
.content {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    border-bottom: 1px solid #e7e7e7;
    width: 80%;
    height: 60px;
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}
</style>