/*回到顶部组件
  传入参数:
    floorstatus:是否显示回到顶部的按钮,默认为true,即显示
  监听事件:
    无
*/
<template>
  <!-- 回到顶部按钮 -->
  <view class="goTop" @click="goTop" v-if="floorstatus">
    <uni-icons custom-prefix="iconfont" type="icon-huidaodingbu" color="#666666" size="45"></uni-icons>
  </view>
</template>

<script>
  export default {
    name: "GoTop",
    data() {
      return {
        
      };
    },
    props:{
      floorstatus:{
        type:Boolean,
        default:true,
      }
    },
    methods: {
      //回到顶部
      goTop() { // 一键回到顶部
        uni.pageScrollTo({
          duration: 500, // 毫秒
          scrollTop: 0 // 位置
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 回到顶部按钮样式 */
  .goTop {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90rpx;
    width: 90rpx;
    position: fixed;
    bottom: 80rpx;
    background: white;
    right: 30rpx;
    border-radius: 50%;
    /* 阴影:水平偏移，竖直偏移，模糊半径，扩展半径*/
    box-shadow: 0px 0px 4px 1px #8b8b8b;
  }
</style>
