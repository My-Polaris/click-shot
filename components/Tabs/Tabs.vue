<template>
  <view class="tabs">
    <view v-for="(item,index) in tabList" :key="index" :class="['tab-item',selectId==item.id?'active':'']" @click="changeTab(item.id)">
      {{item.text}}
    </view>
  </view>
</template>

<script>
  export default {
    name: "Tabs",
    data() {
      return {

      };
    },
    emits:['changeTab'],
    props:{
      tabList:{
        type:Array,
        default:{},
      },
      selectId:{
        type:Number,
        default:0
      }
    },
    methods:{
      changeTab(id) {
        this.$emit('changeTab',id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 顶部标签栏 */
  .tabs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0rpx 50rpx;
    height: 100rpx;
    border-top-left-radius: 35rpx;
    border-top-right-radius: 35rpx;

    /* background-color: rosybrown; */
    .tab-item {
      font-size: 33rpx;
      display: flex;
    }

    .active {
      color: #252a34;
      border-bottom: 10rpx solid currentColor;
    }
  }
</style>
