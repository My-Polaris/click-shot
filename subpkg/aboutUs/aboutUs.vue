<template>
  <view class="page-view">
    <view class="slogen">
      <image src="https://s2.loli.net/2021/12/09/xYb9uf4c7Xqj6NB.png" mode="widthFix">
      </image>
    </view>
    <view class="function-area">
      <!-- 联系客服 -->
      <navigator v-for="(item,index) in itemList" :key="index">
        <view class="function-item">
          <view class="item-title">{{item.label}}</view>
          <view class="item-content">
            <view style="color:gray;">{{item.text}}</view>
            <view class="right-triangle" v-if="!item.text"></view>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        itemList: [
          { name: '', url: '', label: '联系客服' },
          { name: '', url: '', label: '开具发票' },
          { name: '', url: '', label: '当前版本', text: 'v3.8.10' },
          { name: '', url: '', label: '用户协议' },
          { name: '', url: '', label: '注销账号' },
        ],
      };
    }
  }
</script>

<style lang="scss">
  .page-view {
    background-color: #eeeeee;
    height: 100%;

    .slogen {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: white;
      padding-bottom: 50rpx;

      image {
        /* width: 70%; */
        width: 520rpx;
        height: 452rpx;
      }
    }

    .function-area {
      margin-top: 15rpx;
      background-color: white;

    }
  }

  .function-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 35rpx;
    border-bottom: 1rpx solid #eeeeee;
    font-size: 32rpx;
    color: #222831;

    .right-triangle {
      /* CSS三角 */
      /* 把整个view变透明,然后添加把左边框变灰色即是向右箭头 */
      /* width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border: 15rpx solid transparent;
    border-left-color: gray;
    margin-top: 10rpx; */
      /* CSS3三角 */
      width: 14rpx;
      height: 14rpx;
      border-right: 4rpx solid gray;
      border-bottom: 4rpx solid gray;
      transform: rotate(-45deg);
      margin-top: 8rpx;
    }
  }
</style>
