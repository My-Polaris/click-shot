<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <!-- 可以从 @getuserinfo 事件处理函数的形参中，获取到用户的基本信息 -->
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  // 按需导入 mapMutations 辅助函数
  import { mapMutations } from 'vuex'
  export default {
    name: "MyLogin",
    data() {
      return {

      };
    },
    methods: {
      // 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
      ...mapMutations('m_user', ['updateUserInfo','updateToken']),
      // 获取微信用户的基本信息
      getUserInfo(e) {
        // 判断是否获取用户信息成功
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        console.log(e.detail.userInfo)
        /*真实场景:获取e.detail.userInfo设置为userInfo,再将e.detail发往后台获取Token与相关信息*/
        /*模拟场景:直接不用e,调用mock接口获得模拟的userInfo与模拟的Token*/
        
        // this.updateUserInfo(e.detail.userInfo)
        this.getData();
      },
      async getData(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
      
        // 换取 token
        const { data: loginResult } = await uni.$http.get('/api/login/userData')
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        this.updateUserInfo(loginResult.data.userInfo);//用户信息存储到vuex里
        this.updateToken(loginResult.data.token);//Token字符串存储到vuex里
        uni.$showMsg('登录成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #3f72af;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
