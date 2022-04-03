<template>
  <view class="page-view">
    <!-- 个人信息栏 -->
    <person-item :person="userInfo" :ifFocus="true" @submitFocus="submitFocus" :focus="focus"></person-item>

    <view class="post-area">
      <view class="post-request">
        <view class="post-request-item">
          <uni-icons custom-prefix="iconfont" type="icon-dingwei" size="34" color="#393e46"></uni-icons>
          <view><text>面向{{userInfo.region[1]}}</text></view>
        </view>
        <view class="post-request-item">
          <uni-icons custom-prefix="iconfont" type="icon-mudi" size="34" color="#5582b8"></uni-icons>
          <view><text>{{postInfo.goalText}}</text></view>
        </view>
        <view class="post-request-item">
          <uni-icons custom-prefix="iconfont" type="icon-tubiaozhizuomoban" size="34" color="#ffe084"></uni-icons>
          <view><text>{{postInfo.moenyText}}</text></view>
        </view>
      </view>
      <view class="post-info">
        <view class="post-title">
          <text>约拍要求</text>
        </view>
        <view class="post-content">
          <text style="white-space:pre-wrap">{{postInfo.content}}</text>
          <image mode="widthFix" v-for="(src,index) in postInfo.pictures" :key="index" :src="src"></image>
        </view>
        <view class="post-last">
          <text>阅读量:{{postInfo.readNum}}</text>
        </view>
      </view>
      <Footer></Footer>
    </view>
    <!-- 底部栏 -->
    <bottom-item :star="star" :like="like" :likeNum="postInfo.likeNum" :starNum="postInfo.starNum" :userId="userInfo.id"
      @changeLike="changeLike" @changeStar="changeStar"></bottom-item>
  </view>
</template>

<script>
  import PersonItem from '@/components/PersonItem/PersonItem.vue'
  import BottomItem from '@/components/BottomItem/BottomItem.vue'
  import infoCommon from '@/mixin/infoCommon.js'
  import Footer from '@/components/Footer/Footer.vue'
  export default {
    data() {
      return {
        postInfo: {},
        star: false,
        like: false,
      };
    },
    mixins: [infoCommon], //info页面通用逻辑
    components: {
      PersonItem,
      BottomItem,
      Footer,
    },
    methods: {
      async initPage(myId, postId) {
        const params = {
          myId,
          postId
        }
        const {
          data: res
        } = await uni.$http.get('/api/postinfo/postData', { params })
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.userInfo = res.data.userInfo;
        this.postInfo = res.data.postInfo;
        this.star = res.data.star;
        this.like = res.data.like;
        this.focus = res.data.focus;
      },
      //点击收藏or取消收藏
      async changeStar(index) {
        //index为0表示请求点击收藏,为1表示请求取消收藏
        if (this.token == '') return uni.$showMsg('要登录才能收藏噢');
        if (index == 0) {
          console.log("发起收藏动态  " + this.postInfo.id + " 的请求")
          this.myinfo.everStarPost.push(this.postInfo.id);//我收藏了一篇动态
          this.postInfo.starNum++;//该动态的收藏量+1
        }
        else {
          console.log("发起取消收藏动态 " + this.postInfo.id + " 的请求")
          let x = this.myinfo.everStarPost.indexOf(this.postInfo.id);
          if(x!=-1) this.myinfo.everStarPost.splice(x,1);//我取消收藏了一篇动态
          this.postInfo.starNum--;//该动态的收藏量-1
        }
        this.star = !this.star
      },
      //点赞or取消点赞
      async changeLike(index) {
        //index为0表示请求点击点赞,为1表示请求取消点赞
        if (this.token == '') return uni.$showMsg('要登录才能点赞噢');
        if (index == 0) {
          console.log("发起点赞动态  " + this.postInfo.id + " 的请求")
          this.myinfo.everLikePost.push(this.postInfo.id);//我点赞了一篇动态
          this.postInfo.likeNum++;//该动态的点赞量+1
        }
        else {
          console.log("发起取消点赞动态 " + this.postInfo.id + " 的请求")
          let x = this.myinfo.everLikePost.indexOf(this.postInfo.id);
          if(x!=-1) this.myinfo.everLikePost.splice(x,1);//我取消点赞了一篇动态
          this.postInfo.likeNum--;//该动态点赞量-1
        }
        this.like = !this.like
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page-view {
    background-color: #eeeeee;

    .post-area {

      /* 需求信息栏 */
      .post-request {
        height: 150rpx;
        background-color: white;
        margin: 10rpx 0rpx;
        border-radius: 15rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .post-request-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33%;

          text {
            font-size: 28rpx;
            color: #222831;
          }
        }
      }

      /* 动态详情栏 */
      .post-info {
        background-color: white;
        border-radius: 15rpx;

        .post-title {
          padding: 20rpx 25rpx;

          text {
            display: block;
            padding-left: 10rpx;
            font-size: 30rpx;
            color: #222831;
            border-left: 10rpx solid #222831;
          }
        }

        .post-content {
          margin: 10rpx 30rpx;

          text {
            color: gray;
          }

          image {
            margin: 10rpx 30rpx 2rpx;
            width: 90%;
          }
        }

        .post-last {
          text-align: right;
          padding-top: 5rpx;
          margin-bottom: 10rpx;
          padding-right: 30rpx;
          color: gray;
          font-size: 25rpx;
          border-top: 1rpx solid #eeeeee;
        }
      }

    }
  }
</style>
