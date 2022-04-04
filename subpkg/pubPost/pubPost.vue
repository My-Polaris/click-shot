<template>
  <form ref="pubPostForm">
    <uni-card title="约拍要求" isFull="true">
      <textarea v-model="formData.description" placeholder="描述一下你的约拍说明...(不能包含联系方式,5个字以上)" />
    </uni-card>
    <uni-card isFull="true" title="上传照片">
      <uni-file-picker v-model="formData.pictures" title="本人作品/期待风格" limit="9" file-mediatype="image" file-extname="png,jpg"
        :image-styles="{'height':90,'width':90}">
      </uni-file-picker>
    </uni-card>
    <uni-card isFull="true">
      <view class="cell-item">
        <view class="item-label">发布身份</view>
        <picker mode="selector" :range="identityList" @change="changeIdentity">
          {{identityList[formData.identityIndex]}}
          <uni-icons custom-prefix="iconfont" type="icon-xiangxia" size="12"></uni-icons>
        </picker>
      </view>
      <view class="cell-item">
        <view class="item-label">需求价格(￥):</view>
        <input name="price" type="text" placeholder="希望收到/能给出的一个大概价钱" />
        </picker>
      </view>
      <view class="cell-item">
        <view class="item-label">需求目的:</view>
        <picker mode="selector" :range="goalList" @change="changeGoal">
          {{goalList[formData.goalIndex]}}
          <uni-icons custom-prefix="iconfont" type="icon-xiangxia" size="12"></uni-icons>
        </picker>
      </view>
      <view class="cell-item">
        <view class="item-label">期望时间:</view>
        <picker mode="date" :range="date" @change="changeDate">
          {{formData.date}}
          <uni-icons custom-prefix="iconfont" type="icon-xiangxia" size="12"></uni-icons>
        </picker>
      </view>
      <view class="cell-item">
        <view class="item-label">拍摄地点:</view>
        <region-picker @change="bindRegionChange" :value="formData.region">
            {{formData.region[2]}}
            <uni-icons custom-prefix="iconfont" type="icon-xiangxia" :size="12"></uni-icons>
        </region-picker>
      </view>
    </uni-card>
    <button class="submit-button" @click="formSubmit">确认发布</button>
  </form>

</template>

<script>
  export default {
    data() {
      return {
        identityList: ['待选择', '收款方', '付款方', '互勉'],
        goalList: ["目的", "找摄影师", "找模特", "找网店商家"],
        formData:{
          description:"",
          pictures: [],
          identityIndex: 0,
          goalIndex: 0,
          date: "2021-07-06",
          region: ['全部', '全部', '全部'],
        }
      };
    },
    methods: {
      //身份picker
      changeIdentity(e) {
        let x = Number(e.detail.value);
        this.identityIndex = x;
      },
      //需求目的改变
      changeGoal(e) {
        let x = Number(e.detail.value);
        this.goalIndex = x;
      },
      // 改变时间
      changeDate(e) {
        let s = e.detail.value
        this.date = s;
      },
      // 地点改变
      bindRegionChange(e) {
        let x = e.detail.value;
        this.region = x;
      },
      formSubmit(){
        //这里要发起相应的ajax提交表单
        console.log('form发生了submit事件，携带数据为：' + JSON.stringify(this.formData))
        uni.$submitSuccess();
      }
    }
  }
</script>

<style lang="scss">
  .cell-item {
    height: 45rpx;
    padding: 10rpx;
    display: flex;
    align-items: center;

    picker,
    input,
    region-picker{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60rpx;
    padding: 10rpx 20rpx;
    background-color: #393e46;
    color: white;
    height: 70rpx;
    width: 270rpx;
    font-weight: bold;
    font-size: 30rpx;
  }
</style>
