<template>
  <div class="detail hideTabBar" ref="detailRef">
    <van-nav-bar
        title="房屋详情"
        left-text="途家"
        left-arrow
        @click-left="onClickLeft"
    />

    <TabControl
        class="tabs"
        v-if="showTabControl"
        @tabItemClick="tabClick"
        :titles="names"
        ref="tabControlRef"
    />

    <div v-if="mainPart" v-memo="[mainPart]">
      <!--轮播图-->
      <detail_01-swipe :swipeData="mainPart.topModule.housePicture.housePics"/>

      <!--信息-->
      <detail_02-infos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule"/>

      <!--设施信息-->
      <detail_03-facility name="设施" :ref="getSectionRef"
                          :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"/>

      <!--房东信息-->
      <detail_04-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>

      <!--评论-->
      <detail_05-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>

      <!--须知-->
      <detail_06-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>

      <!--周边-->
      <detail_07-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>

      <detail_08-intro :price-intro="mainPart.introductionModule"/>
    </div>


    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">旅途, 永无止境!</div>
    </div>

  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {getDetailInfos} from "@/services";
import {computed, ref, watch} from "vue";
import Detail_01Swipe from "@/views/detail/cpns/detail_01-swipe.vue";
import Detail_02Infos from "@/views/detail/cpns/detail_02-infos.vue";
import Detail_03Facility from "@/views/detail/cpns/detail_03-facility.vue";
import Detail_04Landlord from "@/views/detail/cpns/detail_04-landlord.vue";
import Detail_05Comment from "@/views/detail/cpns/detail_05-comment.vue";
import Detail_06Notice from "@/views/detail/cpns/detail_06-notice.vue";
import main from "@/stores/modules/main";
import Detail_08Intro from "@/views/detail/cpns/detail_08-intro.vue";
import Detail_07Map from "@/views/detail/cpns/detail_07-map.vue";
import TabControl from "@/components/tabControl/tabControl.vue";
import useScroll from "@/hooks/useScroll";

const router = useRouter()
const route = useRoute()
//监听放回按钮的点击
const onClickLeft = () => {
  router.back()
}

//在组件内部发送网络请求
const houseId = route.params.id
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)

getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

//tabControl
const detailRef = ref()
const {scrollTop} = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value > 300
})


//跳转到对应位置
// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
// }

const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute('name')
  sectionEls.value[name] = value.$el
}
let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
}

//页面滚动，滚动时匹配对应的tabControl的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)

  // 2.根据newValue去匹配想要索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(index)
  tabControlRef.value?.setCurrentIndex(index)
})


</script>

<style lang="less" scoped>

.tabs {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;

}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}

</style>