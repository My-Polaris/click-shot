/*底部栏组件
  传入参数:
    star:是否收藏了
    like:是否点赞了
    likeNum:点赞数
    starNum:收藏数,
    userId:该用户的id编号(用于"约拍他"按钮的跳转)
  监听事件:
    changeStar:收藏状态改变,不传参,外部根据传入的star变量的状态判断是发起收藏还是取消收藏
    changeLike:点赞状态改变,不传参,外部根据传入的star变量的状态判断是发起点赞还是取消点赞
*/
<template>
  <view class="botton-item">
    <navigator :url="'/subpkg/appointSub/appointSub?id='+userId" class="appoint-it">约拍他</navigator>
    <view class="select-columns">
      <view class="select-item"  @click="changeStar">
        <uni-icons custom-prefix="iconfont" type="icon-shoucang" :size="29" v-if="!star" class="resign"></uni-icons>
        <uni-icons custom-prefix="iconfont" type="icon-_shoucang" :size="29" v-if="star" style="margin-bottom: 10rpx;"></uni-icons>
        <text>{{starNum}}</text>
      </view>
      <view class="select-item" @click="changeLike">
        <uni-icons custom-prefix="iconfont" type="icon-dianzan" :size="29" v-if="!like"></uni-icons>
        <uni-icons custom-prefix="iconfont" type="icon-_dianzan" :size="29" v-if="like"></uni-icons>
        <text>{{likeNum}}</text>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    name: "BottomItem",
    data() {
      return {

      };
    },
    emits:['changeStar','changeLike'],
    props:{
      like:{
        type:Boolean,
        default:false,
      },
      star:{
        type:Boolean,
        default:false,
      },
      starNum:{
        type:Number,
        default:0,
      },
      likeNum:{
        type:Number,
        default:0,
      },
      userId:{
        type:String,
        default:"",
      }
    },
    methods:{
      changeStar(){
        let index = 0;
        if(this.star) index=1;//当前是点赞的状态,那么就是发起取消点赞
        this.$emit('changeStar',index);
      },
      changeLike(){
        let index = 0;
        if(this.like) index=1;//当前是点赞的状态,那么就是发起取消点赞
        this.$emit('changeLike',index);
      }
    }
  }
</script>

<style lang="scss" scoped>
/* 底部栏 */
  .botton-item{
    display: flex; 
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom:0px;
    background-color: white;
    border-top: 1rpx solid #eeeeee;
    width: 100%;
    height: 110rpx;
    .appoint-it{
      width:190rpx;
      height:75rpx;
      margin-left: 40rpx;
      background-color:#252a34;
      border-radius: 15rpx;
      color:#eeeeee;
      font-size:30rpx;
      text-align: center;
      line-height: 75rpx;
      font-weight: bold;
    }
    .select-columns {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 50%;
      margin-right: 60rpx;
      height: 95%;
      .select-item {
        display: flex;
        justify-content: center;
        align-items: center;
        //点赞图标位置校正
        .resign {
          margin-bottom: 15rpx;
        }
        text {
          color: #222831;
        }
      }
    }
  }
</style>
