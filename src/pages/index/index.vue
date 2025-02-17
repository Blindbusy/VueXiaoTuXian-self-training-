<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPannel from '@/pages/index/components/HotPannel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import { log } from 'console'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  // console.log(res)
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  // console.log(res)
  hotList.value = res.result
}

// 加载页面时调用
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})

// 获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()

// 滚动触底
const onScrolltolower = () => {
  // console.log('滚动触底')
  guessRef.value?.getMore()
}

const isTriggered = ref(false)
// 下拉刷新
const onRefresherrefresh = async () => {
  // 加载动画
  isTriggered.value = true
  // 更新轮播图、前台分类和热门推荐数据
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 滚动容器 -->
  <scroll-view
    refresher-enabled="true"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    :refresher-triggered="isTriggered"
    class="scroll-view"
    scroll-y="true"
  >
    <!-- 自定义轮播图 -->
    <XtxSwiper :list="bannerList" />
    <!-- 分类面板 -->
    <CategoryPanel :list="categoryList" />
    <!--  热门推荐 -->
    <HotPannel :list="hotList" />
    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
