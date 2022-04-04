<template>
  <view class="page-view">
    <view class="question-title">常见问题</view>
    <view class="question-area">
      <view class="question-item" v-for="(item,index) in questionList" :key="index">
        <view class="item-title" @click="changeAnswer(item)">
          <view>{{item.question}}</view>
          <view class="bottom-triangle"></view>
        </view>
        <view class="item-content" v-if="item.isActive">
          <text style="white-space:pre-wrap">{{item.answer}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        questionList:[],
      };
    },
    onLoad(){
      this.initPage();
    },
    methods:{
      async initPage(){
        const {
          data: res
        } = await uni.$http.get('/api/help/questionData')
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.questionList = res.data.questionList
      },
      changeAnswer(item){
        item.isActive = !item.isActive;
      }
    }
  }
</script>

<style lang="scss">
  .page-view {
    background-color: #fdfdfd;
    height: 100%;
    padding-top: 5rpx;
  }

  .question-title {
    background-color: #eeeeee;
    color: gray;
    font-size: 29rpx;
    padding: 15rpx 30rpx;
  }

  .question-area {
    background-color: white;
  }

  .question-item {
    border-bottom: 1rpx solid #eeeeee;
  }

  .item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 35rpx;
    font-size: 32rpx;
    color: #222831;
  }

  .bottom-triangle {
    /* CSS3三角 */
    width: 14rpx;
    height: 14rpx;
    border-left: 4rpx solid gray;
    border-bottom: 4rpx solid gray;
    transform: rotate(-45deg);
  }

  .item-content {
    margin: 10rpx 50rpx;
    background-color: #eeeeee;
    padding: 14rpx;
    color: #393e46;
    font-size: 30rpx;
  }
</style>
