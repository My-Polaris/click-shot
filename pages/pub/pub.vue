<template>
  <view>
    <!-- 发布动态 -->
    <view class="pub-post" @click="navigateToPubPost" open-type="navigate">
      <image src="https://s2.loli.net/2021/12/09/9yeVICMmAY74l3z.png"></image>
      <view class="pub-title">发布动态</view>
    </view>
    
    <!-- 发布作品 -->
    <view class="pub-work" @click="navigateToPubWork" open-type="navigate">
      <image src="https://s2.loli.net/2021/12/09/fDvqpaIwuGVdF1Y.png"></image>
      <view class="pub-title">发布作品</view>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed:{
      ...mapState('m_user',['myinfo','token'])
    },
    methods: {
      navigateToPubPost(){
        if (this.token == '') return uni.$showMsg('要登录才能发布噢');
        uni.navigateTo({
          url:'/subpkg/pubPost/pubPost',
        })
      },
      navigateToPubWork(){
        if (this.token == '') return uni.$showMsg('要登录才能发布噢');
        uni.navigateTo({
          url:'/subpkg/pubWork/pubWork',
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pub-post {
    margin: 50rpx 50rpx;
    height: 375rpx;
    border-radius: 50rpx;
    display: flex;
    /* 阴影:水平偏移，竖直偏移，模糊半径，扩展半径*/
    box-shadow: 5px 5px 8px 2px #8b8b8b;
    background-color: #444f5a;
  }

  .pub-work {
    margin: 50rpx 50rpx;
    height: 375rpx;
    border-radius: 50rpx;
    display: flex;
    /* 阴影:水平偏移，竖直偏移，模糊半径，扩展半径*/
    box-shadow: 5px 5px 8px 2px #8b8b8b;
    background-color: #444f5a;
  }

  image {
    padding: 70rpx 50rpx;
    height: 220rpx;
    width: 220rpx;
  }

  .pub-title {
    padding: 140rpx 40rpx;
    color: white;
    font-size: 50rpx;
    text-shadow: 5px 5px 5px black;
  }
</style>
