/*页脚组件
  传入参数:
    text:显示的页脚语,会识别空格
  监听事件:
    无
*/
<template>
  <view class="footer">
    <text style="white-space:pre-wrap">-THE END-</text>
  </view>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  /* 页脚 */
  .footer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 180px;
    text{
      color: gray;
      font-size: 30rpx;
    }
  }
</style>
