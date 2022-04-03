/*用户个人信息组件
  传入参数:
    person对象:pic用户头像,name用户名,sex性别(0或1),tagList标签数组
    ifFocus:是否显示关注按钮,默认显示
    focus:是否被关注,默认未关注
  监听事件:
    submitFocus:点击了关注or取消关注按钮,传参为0表示发起关注,传参为1表示取消关注
*/
<template>
  <!-- 头部状态栏,传入person数据,传入ifFocus决定是否显示可关注的按钮 -->
  <view class="person-item">
    <!-- 个人信息栏 -->
    <view class="person-info">
      <!-- 用户头像 -->
      <image :src="person.pic" class="person-headphoto" mode="aspectFill">
      </image>

      <!-- 基本个人信息 -->
      <view class="person-text">
        <!-- 顶部姓名与性别 -->
        <view class="person-text1">
          <text>{{person.name}}</text>
          <uni-icons custom-prefix="iconfont" type="icon-nan" color="#159cdd" size="11" class="person-sex"
            v-if="person.sex"></uni-icons>
          <uni-icons custom-prefix="iconfont" type="icon-nv" color="#ff6e6e" size="14" class="person-sex" v-else>
          </uni-icons>
        </view>
        <!-- 底部标签栏 -->
        <view class="person-text2">
          <view v-for="(item,index) in person.tagList" :key="index">
            <!-- 四种标签图标 -->
            <uni-icons custom-prefix="iconfont" type="icon-yishiming" color="#444f5a" size="20" class="person-label"
              v-if="item==0"></uni-icons>
            <uni-icons custom-prefix="iconfont" type="icon-renzhengsheyingshi" color="#0d7375" size="20"
              class="person-label" v-if="item==1"></uni-icons>
            <uni-icons custom-prefix="iconfont" type="icon-renzhengmote" color="#f67280" size="20" class="person-label"
              v-if="item==2"></uni-icons>
            <uni-icons custom-prefix="iconfont" type="icon-huiyuan" color="#ffde7d" size="20" class="person-label"
              v-if="item==3"></uni-icons>
          </view>
          </image>
        </view>
      </view>
      
    </view>
    
    <!-- 关注按钮 -->
    <view class="focus-area" v-if="ifFocus">
      <view class="focus-it" v-if="!focus" @click="submitFocus(0)">
        <button size="mini">关注</button>
      </view>
      <view class="not-focus-it" v-if="focus" @click="submitFocus(1)">
        <button size="mini">已关注</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "PersonItem",
    data() {
      return {
        
      };
    },
    props: {
      person: {
        type: Object,
        default:{},
      },
      ifFocus: {
        type: Boolean,
        default: true,
      },
      focus:{
        type:Boolean,
        default:false,
      }
    },
    emits:['submitFocus'],
    methods:{
      submitFocus(index){
        this.$emit('submitFocus',index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .person-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150rpx;
    width: 100%;
    padding: 0rpx 20rpx;
    background-color: white;

    //个人信息栏
    .person-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      //用户头像
      .person-headphoto {
        margin-top: 15rpx;
        height: 110rpx;
        width: 110rpx;
        border-radius: 50%;
      }

      // 基本个人 信息
      .person-text {
        display: flex;
        flex-direction: column;
        margin-left: 20rpx;
        /* 子元素们居中 */
        justify-content: center;

        .person-text1 {
          display: flex;
          align-items: center;
          padding: 5rpx;

          .person-sex {
            padding-left: 15rpx;
          }
        }

        .person-text2 {
          display: flex;
          justify-content: space-around;
          align-items: center;

          .person-label {
            padding: 5rpx;
            height: 40rpx;
            width: 80rpx;
          }
        }
      }
    }

    // 关注按钮
    .focus-area {
      display: flex;
      justify-content: flex-end;
      align-self: center;
      margin-right: 60rpx;
      /* background-color: seagreen; */
      .focus-it {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        /* background-color: salmon; */
        button {
          background-color: #e23e57;
          color: #eeeeee;
          font-weight: bold;
        }
      }
      
      .not-focus-it {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        button {
          background-color: #252a34;
          color: #eeeeee;
          font-weight: bold;
        }
      }
    }
  
  }
</style>
