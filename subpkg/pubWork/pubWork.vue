<template>
  <form ref="pubWorkForm">
    <view class="section1">
      <uni-file-picker v-model="formData.pictures" title="上传作品" limit="9" file-mediatype="image" file-extname="png,jpg"
        :image-styles="imageStyles">
      </uni-file-picker>
      <view class="title">
        <input type="text" v-model="formData.title" placeholder="填写标题会有更多赞哦~" :maxlength="30" />
      </view>
      <view class="content">
        <textarea v-model="formData.content" placeholder="添加正文"></textarea>
      </view>
    </view>
    <view class="section2">
      <view class="cell-item">
        <view>使用设备</view>
        <input type="text" v-model="formData.useTool" placeholder="请输入使用设备(选填)" />
      </view>
      <view class="cell-item">
        <view>拍摄地点</view>
        <input type="text" v-model="formData.position" placeholder="拍摄地点(选填)" />
      </view>
    </view>
    <!-- 底部栏 -->
    <view class="bottom-item">
      <button class="bottom-item-button" @click="formSubmit">确认发布</button>
    </view>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        imageStyles: {
          "height": 90, // 边框高度
          "width": 90, // 边框宽度
        },
        //表单相关数据,用于提交
        formData:{
          pictures: [],
          title:"",
          content:"",
          useTool:"",
          position:"",
        }
      }
    },
    methods: {
      formSubmit(){
        //这里要发起相应的ajax提交表单
        console.log('form发生了submit事件，携带数据为：' + JSON.stringify(this.formData))
        uni.$submitSuccess();
      }
    }
  }
</script>

<style lang="scss">
  form {
    background-color: #eeeeee;
    .section1 {
      margin: 0rpx 20rpx;
      background-color: white;
      border-radius: 15rpx;
      padding: 20rpx;
      .title {
        margin: 45rpx 20rpx 0rpx;
        padding-bottom: 5rpx;
        padding-left: 15rpx;
        border-bottom: 2rpx solid #393e46;
        input {
          font-size:40rpx
        }
      }
    
      .content {
        margin: 25rpx 20rpx 0rpx;
        padding-left: 15rpx;
        /* background-color: yellow; */
        font-size: 35rpx;
      }
    }
  
    .section2 {
      background-color: white;
      margin: 25rpx 20rpx 20rpx;
      border-radius: 15rpx;
      .cell-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        margin: 10rpx 20rpx;
        font-size: 35rpx;
        border-bottom: 1rpx solid #393e46;
      }
    }
  
    /* 底部栏 */
    .bottom-item {
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: 0px;
      background-color: white;
      border-top: 1rpx solid #eeeeee;
      width: 100%;
      z-index:99;
      height: 150rpx;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20rpx;
        padding: 10rpx 20rpx;
        background-color: #393e46;
        color: white;
        height: 70rpx;
        width: 270rpx;
        font-weight: bold;
        font-size: 30rpx;
      }
    }
  }
</style>
