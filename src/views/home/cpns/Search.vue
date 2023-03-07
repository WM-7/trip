<template>

  <!--位置信息-->
  <div class="section location">
    <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
    <div class="position" @click="positionClick">
      <span>我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>

  <!--日期信息-->
  <div class="section calendar" @click="showCalendar=true">
    <div class="start">
      <div class="date">
        <span class="tip">入住</span>
        <span class="time">{{ startDateStr }}</span>
      </div>
    </div>

    <div class="stay">
      <span>共{{ stayCount }}晚</span>
    </div>

    <div class="end">
      <div class="date">
        <span class="tip">离店</span>
        <span class="time">{{ endDateStr }}</span>
      </div>
    </div>
  </div>

  <!--日历显示-->
  <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      @confirm="onConfirm"
      :formatter="formatter"
  />

  <!--价格/人数-->
  <div class="section price">
    <span>价格不限</span>
    <span>人数不限</span>
  </div>

  <!-- 关键字 -->
  <div class="section keyword">关键字/位置/民宿名</div>

  <!--热门建议-->
  <div class="section hotSuggests">
    <template v-for="(item,index) in hotSuggests" :key="index">
      <div
          class="item"
          :style="{ color: item.tagText.color, background: item.tagText.background.color }"
      >
        {{ item.tagText.text }}
      </div>
    </template>
  </div>

  <!-- 搜索按钮 -->
  <div class="section search-btn">
    <div class="btn" @click="searchBtnClick">开始搜索</div>
  </div>



</template>

<script setup>
import {useRouter} from "vue-router";
import useCityStore from "@/stores/modules/city";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {formatMonthDay, getDiffDays} from "@/utils/format_date";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";

const router = useRouter()
const cityClick = () => {
  router.push('/city')
}

//获取位置
//点击我的位置获取用户的位置  下面这个api拿到的是经纬度  需传入服务器中  拿到对应的城市
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log('获取位置成功：', res)
  }, err => {
    console.log('获取位置失败：', err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

//数据回显
const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)

//日期范围的处理
const mainStore = useMainStore()
const {startDate, endDate} = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
// console.log(startDateStr,endDateStr)
const stayCount = ref(getDiffDays(startDate.value, endDate.value))

//日历处理
let showCalendar = ref(false)
const onConfirm = (value) => {
  // 1.设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  stayCount.value = getDiffDays(value[0], value[1])
  // 2.隐藏日历
  showCalendar.value = false
}

const formatter = (day) => {
  if (day.type === 'start') {
    day.bottomInfo = '入住';
  } else if (day.type === 'end') {
    day.bottomInfo = '离店';
  }
  return day
}

//热门数据
const homeStore = useHomeStore()
const {hotSuggests} = storeToRefs(homeStore)

//点击按钮跳转search页面
const searchBtnClick = () => {
  router.push({
    path:'/search',
    query:{
      startTime:startTime.value,
      endTime:endTime.value,
      currentCity:currentCity.value.cityName
    }
  })
}

</script>

<style lang="less" scoped>
.section {
  height: 44px;
  padding: 0px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #999;
}

.location {
  .city {
    color: #666;
    font-size: 14px;
    flex: 1;
  }

  .position {
    font-size: 12px;
    width: 80px;

    span {
      position: relative;
      top: 3px;
    }

    img {
      width: 18px;
      margin-left: 5px;
    }
  }
}

.calendar {
  padding-right: 60px;
  justify-content: space-between;

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .stay {
    font-size: 12px;
    color: #999;
  }
}

.price {
  padding-right: 60px;
  justify-content: space-between;
}

.hotSuggests {
  margin: 10px 0;
  height: auto;

  .item {
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}

.text{
  color: #ccc;
  display: flex;
  height: 36px;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  box-shadow: 0px 20px 10px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
}
</style>