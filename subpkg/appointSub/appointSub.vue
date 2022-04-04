<template>
  <form class="page-view" ref="appointSubForm">
    <!-- 约拍对象信息展示 -->
    <person-item :person="userInfo" :ifFocus="false"></person-item>
    <view class="section">
      <view class="section-title">
        <view><text>约拍理由</text></view>
      </view>
      <view class="section-content">
        <textarea v-model="formData.appointReason" placeholder="描述一下你想对ta说的话..."></textarea>
      </view>
    </view>
    <view class="section">
      <view class="section-title">
        <view><text>我的联系方式</text></view>
      </view>
      <view class="section-content">
        <view class="input-item">手机号：<input v-model="formData.telNumber" type="number" placeholder="请填写你的手机号" :maxlength="11"></input>
        </view>
        <view class="input-item">微信号：<input v-model="formData.wxNumber" type="text" placeholder="请填写你的微信号"></input>
        </view>
      </view>
    </view>
    <view class="footer">
      <text style="white-space:pre-wrap">{{footer_text}}</text>
    </view>
    <!-- 底部栏 -->
    <view class="bottom-item">
      <view class="how-much">
        <view class="money-num"><text>1.00¥</text></view>
        <view class="money-text"><text>基础定金</text></view>
      </view>
      <view class="submit-money">
        <button class="submit-money-butoon" @click="formSubmit">确认提交</button>
      </view>
    </view>
  </form>
</template>

<script>
  import { mapState } from 'vuex'
  import PersonItem from '@/components/PersonItem/PersonItem.vue'
  export default {
    data() {
      return {
        userInfo: {},
        footer_text: "温馨提示：\n1. 基础定金是为动态发布者筛选真正有诚意想要约拍的一个门槛，提交定金后收到约拍者会主动联系你确定需求与金额。\n2. 在提交请求后，由收到约拍者输入双方协商后的金额，在发起约拍者二次确定金额后，交易达成。\n3. 若三天内双方未完成确定或交易未达成，基础定金自动返还。",
        formData:{
          appointReason:"",
          telNumber:"",
          wxNumber:"",
        }
      };
    },
    components: { PersonItem },
    computed: {
      ...mapState('m_user', ['myinfo', 'token'])
    },
    onLoad(options) {
      let myId = this.myinfo.id ? this.myinfo.id : -1; //如果没登陆的话传的myId是-1
      this.initPage(myId, options.id);
    },
    methods: {
      async initPage(myId, userId) {
        const params = {
          myId,
          userId
        }
        const {
          data: res
        } = await uni.$http.get('/api/appointsub/userData', { params })
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 请求成功，为 data 中的数据赋值
        this.userInfo = res.data.userInfo;
      },
      formSubmit(){
        if(this.token=='')  return uni.$showMsg("请先登陆噢~");
        //这里要发起相应的ajax提交表单
        console.log('form发生了submit事件，携带数据为：' + JSON.stringify(this.formData))
        uni.$submitSuccess();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .page-view {
    background-color: #eeeeee;

    .section {
      background-color: white;
      margin: 10rpx 24rpx;
      border-radius: 15rpx;

      .section-title {
        height: 50rpx;
        padding: 10rpx 30rpx 0rpx;
        border-bottom: 1rpx solid #52616b;
        view {
          padding-left: 10rpx;
          border-left: 10rpx solid #393e46;
          text {
            font-size: 37rpx;
            color: #222831;
          }
        }
      }
    
      .section-content {
        margin: 15rpx 20rpx;
        padding-bottom: 20rpx;
        width: 100%;
        textarea {
          width: 90%;
          height: 235rpx;
          padding: 10rpx 20rpx;
          background-color: #eeeeee;
          border-radius: 15rpx;
        }
        .input-item {
          margin: 25rpx 0rpx;
          display: flex;
          align-items: center;
          input {
            height: 100%;
          }
          text {
            font-size: 35rpx;
          }
        }
      }
    }
  
    /* 页脚 */
    .footer {
      margin: 40rpx 40rpx 300rpx;
      text {
        color: #303841;
      }
    }
  
    /* 底部栏 */
    .bottom-item {
      display: flex;
      justify-content: space-between;
      position: fixed;
      bottom: 0px;
      background-color: white;
      border-top: 1rpx solid #eeeeee;
      width: 100%;
      height: 150rpx;
      .how-much {
        margin-left: 120rpx;
        margin-bottom: 20rpx;
        /* background-color: teal; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text {
          font-size: 34rpx;
          color: #e84a5f;
        }
      }
    
      
    }
  }

  .submit-money {
    margin-bottom: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40rpx;
    button {
      background-color: #e84a5f;
      color: white;
      height: 70rpx;
      width: 200rpx;
      font-size: 35rpx;
      padding: 10rpx 20rpx;
      border-radius: 10rpx;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
