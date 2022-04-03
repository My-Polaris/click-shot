<template>
  <view class="page-view">
    <swiper indicator-dots="true" indicator-active-color="#b83b5e">
      <swiper-item v-for="(src,index) in workInfo.pictures" :key="index">
        <image mode="widthFix" :src="src" />
      </swiper-item>
    </swiper>
    <view class="person-area">
      <!-- 个人信息栏 -->
      <person-item :person="userInfo" :ifFocus="true" @submitFocus="submitFocus" :focus="focus"></person-item>
    </view>
    <view class="work-area">
      <view class="work-content">
        <view class="work-title">
          <text>{{workInfo.title}}</text>
        </view>
        <view class="work-text">
          <text style="white-space:pre-wrap">{{workInfo.content}}</text>
        </view>
        <view class="post-last">
          <text>{{workInfo.pubTime}}</text>
        </view>
      </view>
      <!-- 页脚 -->
      <Footer></Footer>
    </view>
    <!-- 底部栏组件 -->
    <bottom-item :star="star" :like="like" :likeNum="workInfo.likeNum" :starNum="workInfo.starNum" :userId="userInfo.id"
      @changeLike="changeLike" @changeStar="changeStar"></bottom-item>
  </view>
</template>

<script>
  import PersonItem from '@/components/PersonItem/PersonItem.vue'
  import BottomItem from '@/components/BottomItem/BottomItem.vue'
  import Footer from '@/components/Footer/Footer.vue'
  import infoCommon from '@/mixin/infoCommon.js'
  export default {
    data() {
      return {
        workInfo: {},
        star: false,
        like: false,
      };
    },
    mixins: [infoCommon], //info页面通用逻辑
    components: { PersonItem, BottomItem, Footer },
    methods: {
      async initPage(myId, workId) {
        const params = {
          myId,
          workId
        }
        const {
          data: res
        } = await uni.$http.get('/api/workinfo/workData', { params })
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.userInfo = res.data.userInfo;
        this.workInfo = res.data.workInfo;
        this.star = res.data.star;
        this.like = res.data.like;
        this.focus = res.data.focus;
      },
      //点击收藏or取消收藏
      async changeStar(index) {
        //index为0表示请求点击收藏,为1表示请求取消收藏
        if (this.token == '') return uni.$showMsg('要登录才能收藏噢');
        if (index == 0) {
          console.log("发起收藏作品  " + this.workInfo.id + " 的请求")
          this.myinfo.everStarWork.push(this.workInfo.id);//我收藏了一篇动态
          this.workInfo.starNum++;//该动态的收藏量+1
        }
        else {
          console.log("发起取消收藏动态 " + this.workInfo.id + " 的请求")
          let x = this.myinfo.everStarWork.indexOf(this.workInfo.id);
          if(x!=-1) this.myinfo.everStarWork.splice(x,1);//我取消收藏了一篇动态
          this.workInfo.starNum--;//该动态的收藏量-1
        }
        this.star = !this.star
      },
      //点赞or取消点赞
      async changeLike(index) {
        //index为0表示请求点击点赞,为1表示请求取消点赞
        if (this.token == '') return uni.$showMsg('要登录才能点赞噢');
        if (index == 0) {
          console.log("发起点赞动态  " + this.workInfo.id + " 的请求")
          this.myinfo.everLikePost.push(this.workInfo.id);//我点赞了一篇动态
          this.workInfo.likeNum++;//该动态的点赞量+1
        }
        else {
          console.log("发起取消点赞动态 " + this.workInfo.id + " 的请求")
          let x = this.myinfo.everLikePost.indexOf(this.workInfo.id);
          if(x!=-1) this.myinfo.everLikePost.splice(x,1);//我取消点赞了一篇动态
          this.workInfo.likeNum--;//该动态点赞量-1
        }
        this.like = !this.like
      },
    }
  }
</script>

<style lang="scss" scoped>
  .page-view {
    background-color: white;

    swiper {
      width: 100%;
      /* swiper高度=swiper宽度 * 原图高度 /原图宽度 */
      height: calc(750rpx * 1428 / 1080);

      swiper-item {
        display: flex;
        align-items: center;

        image {
          width: 100%;
        }
      }
    }

    /* 作品信息展示区 */
    .work-area {
      .work-content {
        margin: 0rpx 35rpx;

        .work-title {
          margin-bottom: 17rpx;

          text {
            font-size: 40rpx;
            color: #222831;
          }
        }

        .work-text {
          text {
            color: #222831;
            letter-spacing: 1rpx;
          }
        }

        .post-last {
          text-align: left;
          padding-top: 25rpx;
          margin-bottom: 10rpx;
          padding-left: 5rpx;
          color: gray;
          font-size: 25rpx;
        }
      }
    }
  }
</style>
