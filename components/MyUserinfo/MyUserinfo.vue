<template>
  <view class="my">
    <!-- 个人信息栏 -->
    <view class="base-info">
      <navigator class="person-pic" url="/subpkg/editInfo/editInfo">
        <image :src="myinfo.pic" mode="aspectFill"></image>
      </navigator>
      <view class="person-name"><text>{{myinfo.name}}</text></view>
    </view>
    <view class="focus-and-fans">
      <navigator url="/subpkg/followList/followList">
        <text style="white-space:pre-wrap">关注 {{myinfo.focusUserList.length}}</text>
      </navigator>
      <navigator url="/subpkg/fansList/fansList" class="navigator-toFansList">
        <text style="white-space:pre-wrap">粉丝 {{myinfo.fansUserList.length}}</text>
      </navigator>
    </view>
    <view class="vip-entry">
      <view class="vip-text">
        <image src="https://s2.loli.net/2021/12/09/2wy16mTMxGB5lh8.png">
        </image>
        <text>咔嚓摄引VIP</text>
      </view>
      <navigator class="vip-take" url="/subpkg/appplyVip/appplyVip">
        <view class="takeVip-button"><text>开通会员</text></view>
      </navigator>
    </view>
    <view class="select-columns">
      <navigator class="cell-item" v-for="(item,index) in selectColumns" :url="item.url" :key="index">
        <uni-icons custom-prefix="iconfont" :type="item.icon" :size="item.size?item.size:25"></uni-icons>
        </image>
        <text>{{item.text}}</text>
      </navigator>
    </view>
    <view class="bottom-columns">
      <navigator class="bottom-item" url="/subpkg/help/help">
        <uni-icons custom-prefix="iconfont" type="icon-bangzhuzhongxin" size="23"></uni-icons>
        <text>帮助中心</text>
      </navigator>
      <navigator class="bottom-item" url="/subpkg/set/set">
        <uni-icons custom-prefix="iconfont" type="icon-shezhi" size="23"></uni-icons>
        <text>设置</text>
      </navigator>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "MyUserinfo",
    data() {
      return {
        selectColumns: [
          { name: 'myInfo', url: '/subpkg/myInfo/myInfo', icon: 'icon-zhuye', text: '个人主页' },
          { name: 'stars', url: '/subpkg/stars/stars', icon: 'icon-shoucang', text: '我的收藏与点赞' },
          { name: 'dealList', url: '/subpkg/dealList/dealList', icon: 'icon-wodejiaoyi', text: '我的交易' },
          { name: 'check', url: '/subpkg/check/check', icon: 'icon-shenfenrenzheng', text: '身份认证' },
          { name: 'message', url: '/subpkg/message/message', icon: 'icon-wodexiaoxi', text: '我的消息' },
          { name: 'aboutUs', url: '/subpkg/aboutUs/aboutUs', icon: 'icon-guanyuwomen', text: '关于我们', size: 20 },
        ]
      };
    },
    computed: {
      ...mapState('m_user', ['myinfo'])
    }
  }
</script>

<style lang="scss" scoped>
  .my {
    background-color: #f8f8f8;
    padding-top: 20rpx;

    // 基本信息
    .base-info {
      display: flex;
      align-items: center;

      .person-pic {
        margin: 10rpx 20rpx;

        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
        }
      }

      .person-name {
        display: flex;
        align-items: center;

        text {
          font-size: 30rpx;
          font-weight: bold;
          color: black;
        }
      }
    }

    // 关注与粉丝
    .focus-and-fans {
      display: flex;
      justify-content: space-around;

      text {
        background-color: white;
        color: #222831;
        font-weight: bold;
        display: flex;
        align-items: center;
        height: 80%;
      }
    }

    //vip通道
    .vip-entry {
      height: 160rpx;
      background-color: #393e46;
      margin: 15rpx 30rpx;
      border-radius: 30rpx;
      /* 阴影:水平偏移，竖直偏移，模糊半径，扩展半径*/
      box-shadow: 3px 3px 5px 3px #8b8b8b;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .vip-text {
        padding: 0rpx 20rpx;
        display: flex;
        align-items: center;

        image {
          height: 70rpx;
          width: 70rpx;
        }

        text {
          font-size: 36rpx;
          font-weight: bold;
          color: #ffde7d;
        }
      }

      .vip-take {
        height: 80rpx;
        width: 200rpx;
        background-color: #ffde7d;
        border-radius: 30rpx;
        margin-right: 30rpx;

        .takeVip-button {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 15rpx;

          text {
            font-weight: bold;
            color: #393e46;
          }
        }
      }

    }

    //各种选项栏
    .select-columns {
      margin-top: 50rpx;
      border-top: 1rpx solid #52616b;

      .cell-item {
        display: flex;
        align-items: center;
        height: 8vh;
        border-bottom: 1rpx solid #52616b;

        text {
          font-weight: bold;
          color: #2a363b;
          font-size: 38rpx;
        }

        uni-icons {
          margin: 10rpx 30rpx 10rpx 60rpx;
        }
      }
    }

    //底部选项栏
    .bottom-columns {
      position: absolute;
      width: 100vw;
      bottom: 0rpx;
      height: 10%;
      background-color: #f9f7f7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom-left-radius: 30rpx;
      border-bottom-right-radius: 30rpx;

      .bottom-item {
        width: 50%;
        padding: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        text {
          font-weight: bold;
          color: #393e46;
          font-size: 37rpx;
        }
      }
    }

  }
</style>
