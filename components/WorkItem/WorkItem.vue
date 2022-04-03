/*作品栏组件,类似于PostItem组件
  传入参数:
    work对象:id作品编号,title作品标题,pictures作品图片数组,readNum阅读量
  监听事件:
    无
*/
<template>
  <view class="work-item">
    <navigator :url="'/subpkg/workInfo/workInfo?id='+work.id">
      <view class="work-info">
        <view class="work-text">
          <text>{{work.title}}</text>
        </view>
        <view class="work-pic">
          <scroll-view scroll-x>
            <image mode="aspectFill" v-for="(src,index) in work.pictures" :key="index" :src="src">
            </image>
          </scroll-view>
        </view>
      </view>
    </navigator>
    <view class="work-last">
      <text>阅读量:{{work.readNum}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "WorkItem",
    data() {
      return {

      };
    },
    props:{
      work:{
        type:Object,
        default:{},
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 作品展示区域 */
  .work-item {
    margin: 10rpx 2rpx;
    padding: 30rpx 0rpx 10rpx;
    background-color: white;
    border-radius: 30rpx;
    .work-info {
      height: 90%;
      padding: 0rpx 30rpx;
      margin-bottom: 10rpx;
      .work-text {
        padding: 10rpx 6rpx;
        text {
          font-size: 35rpx;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .work-pic {
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* 规定段落中的文本不进行换行 */
        white-space: nowrap;
        scroll-view {
          height: 385rpx;
          width: auto;
          overflow: hidden;
          image {
            height: 100%;
            width: 50%;
            padding: 5rpx;
          }
        }
      }
    }
  }

  .work-last {
    text-align: right;
    padding-top: 5rpx;
    padding-right: 40rpx;
    color: gray;
    font-size: 25rpx;
    border-top: 1rpx solid #eeeeee;
    text {
      font-size: 24rpx;
    }
  }
</style>
