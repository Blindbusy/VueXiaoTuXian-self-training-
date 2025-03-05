// AddressPanel.vue
<script setup lang="ts">
import { getMemberAddressAPI } from '@/services/address'
import type { AddressItem } from '@/types/address'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取父组件传递过来的参数
const props = defineProps<{
  show: boolean
}>()
// 子组件调用父组件中关闭弹出层的方法
const emit = defineEmits<{
  (event: 'close'): void
}>()
// 引入地址列表
const addressList = ref<AddressItem[]>([])
const getAddressListData = async () => {
  console.log('获取地址列表数据')
  const res = await getMemberAddressAPI()
  console.log(res)
  addressList.value = res.result
}
if (props.show) {
  getAddressListData()
}
// 点击地址
let timer: any = null
const onTapAddress = (id: string) => {
  // console.log('点击地址', id)
  addressList.value.forEach((item) => {
    item.isDefault = item.id === id ? 1 : 0
  })
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    emit('close')
  }, 2000)
}
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @tap="emit('close')"></text>
    <!-- 标题 -->
    <view class="title">配送至</view>
    <!-- 内容 -->
    <view class="content">
      <view class="item" v-for="item in addressList" :key="item.id">
        <view class="user">{{ item.receiver }} {{ item.contact }}</view>
        <view class="address">{{ item.fullLocation }}</view>
        <text
          class="icon"
          :class="{
            'icon-checked': item.isDefault === 1,
            'icon-ring': item.isDefault === 0,
          }"
          @tap="onTapAddress(item.id)"
        ></text>
      </view>
    </view>
    <view class="footer">
      <view class="button primary"> 新建地址 </view>
      <view v-if="false" class="button primary">确定</view>
    </view>
  </view>
</template>

<style lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
}

.content {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
  }
  .icon {
    color: #999;
    font-size: 40rpx;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }
  .icon-checked {
    color: #27ba9b;
  }
  .icon-ring {
    color: #444;
  }
  .user {
    font-size: 28rpx;
    color: #444;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #666;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
}
</style>
