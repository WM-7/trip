<template>
  <div class="map">
    <DetailSection title="位置周边" moreText="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from '@/components/DetailSection/DetailSection.vue';
import {onMounted, ref} from "vue";

const props = defineProps({
  position:{
    type:Object,
    default:()=>({})
  }
})


//获取document
const mapRef = ref()

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value);
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude);
  map.centerAndZoom(point, 15);
  const marker = new BMapGL.Marker(point);
  map.addOverlay(marker)
})

</script>

<style lang="less" scoped>
.baidu{
  height: 250px;
}

</style>