<template>
  <view class="page-view">
    <!-- 用户信息 -->
    <view class="person-area">
      <view class="person-headphoto">
        <image :src="myinfo.pic" mode="aspectFill"></image>
      </view>
      <view class="text-area">
        <view class="person-name"><text>{{myinfo.name}}</text></view>
        <view class="appply-tip"><text>开通会员享更多权益</text></view>
      </view>
    </view>
    <!-- 会员价格 -->
    <view class="money-area">
      <view class="area-title">咔嚓摄引会员</view>
      <view class="choice-area">
        <view v-for="(item,index) in vipPriceList" :key="index" :class="['choice-item',item.id==selectId?'active':'']"
          @click="handleGroupItem(item.id)">
          <view class="vip-time">{{item.time}}</view>
          <view class="vip-basePrice">￥{{item.basePrice}}</view>
          <view class="vip-realPrice">原价￥{{item.realPrice}}</view>
        </view>
      </view>
    </view>
    <!-- 会员权益 -->
    <view class="info-area">
      <view class="area-title">会员权益</view>
      <view class="vip-icon">
        <view class="icon-item" v-for="(item,index) in vipLabelList" :key="index">
          <view class="icon-image">
            <uni-icons customPrefix="iconfont" :type="item.icon" :color="item.color" :size="item.size"></uni-icons>
          </view>
          <text>{{item.text}}</text>
        </view>
      </view>
      <!-- 表格 -->
      <view class="vip-table">
        <view class="table-title">
          <view class="th" v-for="(text,index) in vipTitleList" :key="index">{{text}}</view>
        </view>
        <block v-for="(item,index) in vipPowerList" :key="index">
          <view class="table-content">
            <view class="td">{{item.server}}</view>
            <view class="td">{{item.not_vip}}</view>
            <view class="td">{{item.vip}}</view>
          </view>
        </block>
      </view>
    </view>
    <!-- 会员办理按钮 -->
    <view class="take-vip">
      <view class="take-button" @click="submitForm">立即开通</view>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        vipPriceList:[],
        selectId:0,
        vipPowerList:[],
        vipLabelList:[
          { icon:'icon-huiyuan',color:'#ffde7d',size:32,text:'会员福利' },
          { icon:'icon-fuwufeijianmian',color:'#ffde7d',size:32,text:'定金减免' },
          { icon:'icon-dongtaituiguang',color:'#ffde7d',size:32,text:'动态推广' },
          { icon:'icon-tags-fill',color:'#ffde7d',size:32,text:'会员标识' },
        ],
        vipTitleList:[],
      };
    },
    computed:{
      ...mapState('m_user',['myinfo','token'])
    },
    onLoad(){
      this.initPage();
    },
    methods:{
      async initPage(){
        const {
          data:res
        } = await uni.$http.get('/api/applyVip/vipData');
        console.log(res)
        this.vipPriceList = res.data.vipPriceList;
        this.vipPowerList = res.data.vipPowerList;
        this.vipTitleList = res.data.vipTitleList;
      },
      // 选择要开通的会员类型
      handleGroupItem(index){
        this.selectId = index;
      },
      submitForm(){
        //这里要发起相应的ajax提交办理会员
        console.log('form发生了submit事件，携带数据为：' + JSON.stringify(this.selectId))
        uni.$submitSuccess('办理成功!\n恭喜你成为咔嚓摄引会员\n');
      }
    }
  }
</script>

<style lang="scss">
.page-view{
  background-color: #eeeeee;
  /* 用户信息 */
  .person-area{
    background-color: #393e46;
    height: 200rpx;
    padding: 10rpx 40rpx;
    display: flex;
    align-items: center;
    .person-headphoto{
      image{
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
      }
    }
    .text-area{
      margin-top: 20rpx;
      .person-name{
        padding: 5rpx 10rpx;
        color: #eeeeee;
      }
      .appply-tip{
        padding: 5rpx 10rpx;
        color: #eeeeee;
      }
    }
  }
  
}
.area-title{
    padding: 20rpx 30rpx 0rpx;
    font-size: 37rpx;
  }
/* 会员价格 */
.money-area{
  height: 380rpx;
  background-color: white;
  .choice-area{
    padding: 0rpx 15rpx;
    display: flex;
    align-items: center;
    justify-content:space-around;
    height: 270rpx;
    .choice-item{
      height: 215rpx;
      width: 215rpx;
      border-radius: 20rpx;
      border: 1rpx solid #393e46;
      .vip-time{
        padding-top: 15rpx;
        padding-left: 30rpx;
        font-size: 37rpx;
        color: #393e46;
      }
      .vip-basePrice{
        padding: 5rpx 70rpx 10rpx;
        font-size: 50rpx;
        color: #FE6B70;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .vip-realPrice{
        display: flex;
        justify-content: center;
        color: #999999;
        font-size: 28rpx;
        font-weight:lighter;
        text-decoration: line-through;
        /* background-color: red; */
      }
    }
    .active{
      border: 1rpx solid #ffde7d;
      background-color: #FFF8EB;
    }
  }
}
/* 会员权益 */
.info-area{
  margin-top: 20rpx;
  background-color: white;
 .vip-icon{
   display: flex;
   align-items: center;
   justify-content: space-around;
   margin: 20rpx 20rpx 10rpx;
   .icon-item{
     width: 150rpx;
     height: 180rpx;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     .icon-image{
       width: 100rpx;
       height: 100rpx;
       display: flex;
       align-items: center;
       justify-content: center;
       background-color: #323232;
       border-radius: 50%;
       margin-bottom: 15rpx;
     }
     text{
       color: #323232;
       font-size: 32rpx;
       font-weight: 500;
     }
   }
 } 
}
/* 表格 */
.vip-table {
  border-right: 0.5rpx solid #ffde7d;
  border-bottom: 0.5rpx solid #ffde7d;
  margin: 0rpx 40rpx;
  font-size: 32rpx;
 }
 .table-title {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
 }
 .th {
  flex: 1;
  justify-content: center;
  background: #393e46;
  color: #fff;
  display: flex;
  height: 70rpx;
  align-items: center;
  border-left: 0.5rpx solid #ffde7d;
  border-top: 0.5rpx solid #ffde7d;
 }
 .table-content{
  display: flex;
  width: 100%;
  justify-content: center;
  border-top: 0.5rpx solid #ffde7d;
 }
 .td {
  width:40%;
  /* height: 70rpx; */
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-left: 0.5rpx solid #ffde7d;
  padding: 15rpx 0rpx;
 }
 /* 会员办理 */
 .take-vip{
   height: 220rpx;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: white;
 }
 .take-button{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 350rpx;
   height: 100rpx;
   border-radius: 20rpx;
   background-color: #393e46;
   color: #FFF8EB;
   font-size: 37rpx;
 }
 /* 弹窗 */
.Dialog-item{
  position: fixed;
  bottom:550rpx;
  height: 570rpx;
  width: 500rpx;
  left: 125rpx;
  right: 125rpx;
  z-index: 10;

  background-color: white;
  border: 1rpx solid #393e46;
  border-radius: 60rpx;
  /* background: rgba(0, 0, 0, 0.4); */
}
.Dialog-info{
  height: 65%;
  background-color: #F5F9FA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:20rpx;
  border-radius: 60rpx;
  font-size: 38rpx;
  color: #323232;
}
.Dialog-button{
  height: 100rpx;
  display: flex;
  justify-content: center;
}
.Dialog-button image{
  height: 100rpx;
}
</style>
