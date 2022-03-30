<template>
  <!-- 表单项组件,需要传入的参数
    person:{pic:用户头像地址,name:用户名,sex:性别,tagList:标签列表}
    post:{title:动态标题,content:动态描述,pictures:图片组}-->
  <view class="post-item">
    <!-- 使用PersonItem组件,不需要关注按钮 -->
    <navigator url="/subpkg/personInfo/personInfo">
      <person-item :person="person" :ifFocus="false"></person-item>
    </navigator>

    <!-- 消息栏 -->
    <navigator url="/subpkg/postInfo/postInfo" class="navigator-toPost">
      <view class="post-info">
        <view class="post-request">
          <text>{{post.title}}</text>
        </view>
        <view class="post-text">
          <text style="white-space:pre-wrap">{{post.content}}</text>
        </view>
        <view class="post-pic">
          <scroll-view scroll-x>
            <!-- 动态展示样例1~4 -->
            <image v-for="item in post.pictures" class="post-image" mode="aspectFill" :src="item">
            </image>
          </scroll-view>
        </view>
      </view>
    </navigator>
    <view class="post-last">
      <text>阅读量:{{post.readNum}}万</text>
    </view>
  </view>
</template>

<script>
  import PersonItem from '@/components/PersonItem/PersonItem.vue'
  export default {
    name: "PostItem",
    data() {
      return {

      };
    },
    components: { PersonItem },
    props: {
      person: {
        type: Object,
        isrequired: true
      },
      post: {
        type: Object,
        isrequired: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 动态展示区 */
  .post-item {
    margin: 10rpx 2rpx;
    height: 580rpx;
    background-color: white;
    border-radius: 30rpx;
    .navigator-toPost {//没有inline样式图片显示不出来
      display: inline;
    }
    .post-info {
      height: 65%;
      display: flex;
      flex-direction: column;
      padding: 0rpx 30rpx;
      margin-bottom: 10rpx;
      .post-request text {
        font-size: 35rpx;
        padding: 0rpx 5rpx;
        /* background-color: green; */
      }
      .post-text{
        /* display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: hidden;
        padding: 0rpx 5rpx;
        display: -webkit-box;
        overflow: hidden; */
        text {
          color: #8b8b8b;
          font-size: 28rpx;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .post-pic {
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* 规定段落中的文本不进行换行 */
        white-space: nowrap;
        scroll-view {
          height: 100%;
          width: auto;
          overflow: hidden;
          .post-image {
            height: 100%;
            width: 50%;
            padding: 5rpx;
          }
        }
      }
    }
    
    .post-last {
      text-align: right;
      padding-top: 5rpx;
      padding-right: 30rpx;
      color: gray;
      font-size: 25rpx;
      border-top: 1rpx solid #eeeeee;
      text {
        font-size: 24rpx;
      }
    }
  }

</style>
