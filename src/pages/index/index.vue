<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPannel from '@/pages/index/components/HotPannel.vue'
import PageSkeleton from '@/pages/index/components/PageSkeleton.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import { log } from 'console'
import { useGuessList } from '@/composables/index'

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

// 是否正在加载
const isLoading = ref(false)
// 加载页面时调用
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

// 获取猜你喜欢组件实例和滑动触底
const { guessRef, onScrolltolower } = useGuessList()

const isTriggered = ref(false)
// 下拉刷新
const onRefresherrefresh = async () => {
  // 加载动画
  isTriggered.value = true
  // 重置猜你喜欢组件的数据,先重置再调用新数据
  guessRef.value?.resetData()
  // 更新轮播图、前台分类和热门推荐数据
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value.getMore(),
  ])
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
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!--  热门推荐 -->
      <HotPannel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
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
