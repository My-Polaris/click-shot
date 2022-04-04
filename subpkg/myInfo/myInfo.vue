<template>
  <view>
    个人主页
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">

</style>
<template>
  <view class="page-view">
    <!-- 用户信息展示 -->
    <view class="person-area">
      <view class="person-area1">
        <view class="person-pic">
          <image mode="aspectFill" :src="userInfo.pic"></image>
        </view>
        <view class="person-text">
          <view class="person-name">{{userInfo.name}}</view>
          <view class="person-info">
            <view class="person-sex">
              <uni-icons custom-prefix="iconfont" type="icon-nan" color="#159cdd" size="14" v-if="userInfo.sex">
              </uni-icons>
              <uni-icons custom-prefix="iconfont" type="icon-nv" color="#ff6e6e" size="15" v-else>
              </uni-icons>
            </view>
            <view class="person-location">{{userInfo.region[0]}} {{userInfo.region[1]}}</view>
          </view>
        </view>
      </view>
      <view class="person-area2">
        <view class="person-intro" style="white-space:pre-wrap">
          <text>{{userInfo.introduce}}</text>
        </view>
      </view>
      <view class="person-area3">
        <view class="info3">
          <view class="info-item">
            <view>{{userInfo.focusUserList.length}}</view>
            <view>关注</view>
          </view>
          <view class="info-item">
            <view>{{userInfo.fansUserList.length}}</view>
            <view>粉丝</view>
          </view>
          <view class="info-item">
            <view>{{userInfo.finishDealList.length}}</view>
            <view>交易单数</view>
          </view>
        </view>
        <view class="button2">
          <view class="toEdit">
            <navigator url="/subpkg/editInfo/editInfo">编辑资料</navigator>
          </view>
          <navigator class="toSet" url="/subpkg/set/set">
            <uni-icons customPrefix="iconfont" type="icon-shezhi" size="18" color="#eeeeee"></uni-icons>
          </navigator>
        </view>
      </view>
    </view>

    <!-- 动态作品展示 -->
    <view class="show-area">
      <tabs :tabList="tabList" :selectId="selectId" @changeTab="changeTab"></tabs>
      <view class="post-show" v-if="selectId==0">
        <view class="post-item" v-for="(item,index) in pubPostList" :key="index">
          <post-item :post="item" :isShowPersonItem="false"></post-item>
        </view>
      </view>
      <view class="work-show" v-if="selectId==1">
        <work-item v-for="(item,index) in pubWorkList" :key="index" :work="item"></work-item>
      </view>
    </view>
  </view>
</template>

<script>
  import PostItem from '@/components/PostItem/PostItem.vue'
  import Tabs from '@/components/Tabs/Tabs.vue'
  import WorkItem from '@/components/WorkItem/WorkItem.vue'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        userInfo: {}, //个人详情
        tabList: [{ id: 0, text: "约拍动态" }, { id: 1, text: "作品相册" }],
        selectId: 0, //选中的tab栏
        pubPostList: [], //发布的动态
        pubWorkList: [], //发布的作品
      };
    },
    computed: {
      ...mapState('m_user', ['myinfo', 'token'])
    },
    onLoad() {
      this.initPage();
    },
    components: { PostItem, Tabs, WorkItem },
    methods: {
      /*不同之处1:只用userId查,不返回focus变量*/
      async initPage() {
        const params = {
          userId: this.myinfo.id
        }
        const {
          data: res
        } = await uni.$http.get('/api/myinfo/userData', { params })
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 请求成功，为 data 中的数据赋值
        this.userInfo = res.data.userInfo;
        this.pubPostList = res.data.pubPostList;
        this.pubWorkList = res.data.pubWorkList;
      },
      // 标签栏改变函数
      changeTab(id) {
        //console.log(id);
        this.selectId = id
      },
    }
  }
</script>

<style lang="scss" scoped>
  .page-view {
    background-color: #393e46;
    display: flex;
    flex-direction: column;

    .person-area {
      margin: 0rpx 20rpx;

      /* 用户信息区域1 */
      .person-area1 {
        height: 38%;
        /* 上 左右 下 */
        margin: 20rpx 0rpx 10rpx;
        display: flex;

        .person-pic {
          height: 90%;
          width: 23%;
          margin: 10rpx 30rpx;

          image {
            height: 164rpx;
            width: 164rpx;
            border-radius: 50%;
            border: 4rpx solid #eeeeee;
          }
        }

        .person-text {
          margin-left: 11rpx;
          width: 500rpx;

          .person-name {
            font-size: 43rpx;
            padding-top: 32rpx;
            color: #eeeeee;
          }

          .person-info {
            display: flex;
            margin: 15rpx 0rpx;
            align-items: center;

            /* background-color: hotpink; */
            .person-sex {
              display: flex;
              flex-direction: column;
              height: 50rpx;
              width: 50rpx;
              background-color: #eeeeee;
              border-radius: 50%;
              justify-content: center;
              align-items: center;
            }

            .person-location {
              max-width: 350rpx;
              margin-left: 20rpx;
              padding: 5rpx 20rpx;
              background-color: #eeeeee;
              border-radius: 30rpx;
              //超过一行显示省略号
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }

      /* 用户信息区域2 */
      .person-area2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4; //最多显示4行
        overflow: hidden;
        padding-left: 45rpx;

        .person-intro {
          color: #cccccc;
          font-size: 28rpx;
        }
      }

      /* 用户信息区域3 */
      .person-area3 {
        height: 24%;
        margin: 20rpx 0rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .info3 {
          width: 355rpx;
          margin: 0rpx 10rpx;
          display: flex;

          .info-item {
            padding-left: 20rpx;
            max-width: 200rpx;
            display: flex;
            flex-direction: column;
            /* 主轴上居中 */
            justify-content: center;
            align-items: center;
            color: #eeeeee;

            view:first-child {
              color: #cccccc;
            }
          }
        }

        .button2 {
          width: 353rpx;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .toEdit {
            /* width: 44%; */
            padding-top: 1rpx;
            padding-right: 3rpx;

            navigator {
              background-color: #252a34;
              color: #eeeeee;
              padding: 10rpx 20rpx;
              border-radius: 10rpx;
              font-weight: bold;
            }
          }

          .toSet {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 1rpx;
            padding-right: 3rpx;
            width: 80rpx;
            height: 58rpx;
            margin: 0rpx 10rpx;
            border-radius: 10rpx;
            background-color: #252a34;
          }
        }
      }
    }
  }

  /* 动态作品展示区域 */
  .show-area {
    /* background-color: red; */
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 35rpx;
    border-top-right-radius: 35rpx;
    background-color: snow;

    /* 动态展示区域 */
    .post-show {
      background-color: #eeeeee;

      .post-item {
        margin: 10rpx 2rpx;
        padding: 30rpx 0rpx 1rpx;
        background-color: white;
        border-radius: 30rpx;
      }
    }
  }

  /* 作品展示区域 */
  .work-show {
    background-color: #eeeeee;
  }
</style>
