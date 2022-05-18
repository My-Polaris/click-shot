<template>
  <view class="page-view">
    <view class="function-area">
      <navigator v-for="(item,index) in itemList" :url="item.url" :key="index">
        <view class="function-item">
          <view class="item-title">{{item.label}}</view>
          <view class="item-content">
            <view>{{item.text?item.text:''}}</view>
            <view class="right-triangle"></view>
          </view>
        </view>
      </navigator>
      <!-- 退出登录 -->
      <view class="function-item log-out" @click="logOut">退出登录</view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        itemList: [
          { name: 'editInfo', url: '/subpkg/editInfo/editInfo', label: '编辑资料' },
          { name: 'telphone', url: '', label: '手机号',text:'' },
          { name: 'password', url: '', label: '登陆密码', text: '未设置' },
          { name: 'feedback', url: '/subpkg/feedback/feedback', label: '意见反馈' },
          { name: 'aboutUs', url: '/subpkg/aboutUs/aboutUs', label: '关于咔嚓摄引' }
        ]
      };
    },
    computed: {
      ...mapState('m_user', ['myinfo'])
    },
    onLoad() {
      this.itemList[1].text = this.myinfo.telphone
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      // 退出登录
      async logOut() {
        // 询问用户是否退出登录
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)

        if (succ && succ.confirm) {
          // 用户确认了退出登录的操作
          // 需要清空 vuex 中的 userinfo、token 和 address
          this.updateUserInfo({})
          this.updateToken('')
          uni.switchTab({
            url: '/pages/my/my'
          })
          return;
        }
      }
    }
  }
</script>

<style lang="scss">
  .page-view {
    background-color: #fdfdfd;
    height: 100%;
    padding-top: 5rpx;

    .function-area {
      background-color: white;

      .function-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 35rpx;
        border-bottom: 1rpx solid #eeeeee;
        font-size: 32rpx;
        color: #222831;

        .item-content {
          display: flex;
          align-items: center;
          color: gray;
          margin-top: 8rpx;

          .right-triangle {
            /* CSS3三角 */
            width: 14rpx;
            height: 14rpx;
            border-right: 4rpx solid gray;
            border-bottom: 4rpx solid gray;
            transform: rotate(-45deg);
          }
        }
      }

      .log-out {
        justify-content: center;
        font-weight: 700;
        color: gray;
      }
    }
  }
</style>
