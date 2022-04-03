<template>
  <view>
    <!-- 搜索栏 -->
    <view class="search_input">
      <navigator url="/subpkg/search/search" open-type="navigate" class="navigator-toSearch">
        搜索
      </navigator>
    </view>

    <!-- 轮播图区域 -->
    <swiper indicator-dots="true" autoplay interval="4000" circular>
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <!-- 动态绑定图片的 src 属性 -->
        <image :src="item.img_src" mode="aspectFill" class="swiper-image"></image>
      </swiper-item>
    </swiper>

    <!-- 自定义按钮组组件,来源于buttonList，同时传入选中的id-->
    <view style="margin:20rpx">
      <button-group :itemList="buttonList" :selectId="selectId" @buttonChange="buttonChange"></button-group>
    </view>

    <!-- 筛选动态组件 -->
    <!-- 筛选动态,分别来源于官方的region,自定义的goalList和sexList,索引为region[1][2][3],goalIndex,sexIndex-->
    <view class="section">
      <region-picker @change="bindRegionChange" :value="region" :custom-item="customItem">
        <view class="picker">
          {{region[2]}}
          <uni-icons custom-prefix="iconfont" type="icon-xiangxia" :size="12"></uni-icons>
        </view>
      </region-picker>
      <picker mode="selector" @change="bindGoalChange" :value="index" :range="goalList">
        <view class="picker">
          {{goalList[goalIndex]}}
          <uni-icons custom-prefix="iconfont" type="icon-xiangxia" size="12"></uni-icons>
        </view>
      </picker>
      <picker mode="selector" @change="bindSexChange" :value="index" :range="sexList">
        <view class="picker">
          {{sexList[sexIndex]}}
          <uni-icons custom-prefix="iconfont" type="icon-xiangxia" size="12"></uni-icons>
        </view>
      </picker>
    </view>

    <!-- 动态显示区域 -->
    <view class="post-area" v-for="(item,index) in pageList" :key="index">
      <post-item :person="item.person" :post="item.post"></post-item>
    </view>

    <!-- 回到顶部的按钮 -->
    <go-top></go-top>

  </view>
</template>

<script>
  import ButtonGroup from '@/components/ButtonGroup/ButtonGroup.vue'
  import regionPicker from "@/components/region-picker/region-picker.vue"
  import PostItem from '@/components/PostItem/PostItem.vue'
  import GoTop from '@/components/GoTop/GoTop.vue'
  import pageSearch from '@/mixin/pageSearch.js'
  export default {
    data() {
      return {
        swiperList: [], //  轮播图的数据列表(ajax获取)
        buttonList: [{ id: 0, text: "收费区" }, { id: 1, text: "付费区" }, { id: 2, text: "互勉区" }], //按钮选项(ajax获取)
        //selectId: 0, //选中的按钮编号
        goalList: ["目的"], //目的列表(ajax获取后续,这里给1个初始值)
        goalIndex: 0, //当前选取的目的
        sexList: ['性别'], //性别列表(ajax获取后续,这里给1个初始值)
        sexIndex: 0, //当前选取的性别
        region: ['全部', '全部', '全部'], //当前选取的地区(ajax获取,这样后台可以设置默认地区,这里给3个初始值)
        customItem: '全部', //为地区选择器每列添加的自定义项(暂时无效)
      }
    },
    mixins:[pageSearch],//分页查询、上拉刷新、触底提示、按钮变换的混用
    //引入地区选择栏的库
    components: { ButtonGroup, regionPicker, PostItem, GoTop },
    // 页面加载函数
    onLoad() {
      // 在小程序页面刚加载时调用
      this.getBaseList();
      this.getPageList();
    },
    methods: {
      //获取基本数据
      async getBaseList() {
        const {
          data: res
        } = await uni.$http.get('api/home/baseData')
        //console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 请求成功，为 data 中的数据赋值
        this.swiperList = res.data.swiperList; //轮播图列表赋值
        this.goalList = res.data.goalList; //目的类型列表
        this.sexList = res.data.sexList; //性别类型列表
        this.region = res.data.region; //地区类型列表赋值
      },
      //获取动态列表
      async getPageList(cb) {
        const params = {
          goal: this.goalIndex,
          sex: this.sexIndex == 0 ? 2 : this.sexIndex - 1,
          region: this.region,
          type: this.selectId, //选中的按钮的类型,收费,付费or互勉
          pageNum: this.pageNum, //要显示的页数
          pageSize: this.pageSize, //一次申请需要获取的数据数量
        };
        //console.log("发起请求获取动态列表,参数为-",params);
        this.isloading = true; // 打开节流阀
        const {
          data: res
        } = await uni.$http.get('api/home/postData', { params })
        console.log(res)
        this.isloading = false // 关闭节流阀
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()

        if (res.meta.status !== 200) return uni.$showMsg()
        // 请求成功，为 data 中的数据赋值
        this.pageList = [...this.pageList, ...res.data.List]; //拼接
        this.total = res.data.total; //数据总数赋值
      },
      //筛选条件的选中更新事件
      bindGoalChange(e) {
        // console.log(e);
        let x = Number(e.detail.value);
        if (this.goalIndex != x) { //变化了才发起请求
          this.goalIndex = x;
          this.resetQuery(); //重置数据
          this.getPageList();
        }
      },
      bindSexChange(e) {
        // console.log(e);
        let x = e.detail.value;
        if (this.sexIndex != x) { //变了才发起请求
          this.sexIndex = e.detail.value;
          this.resetQuery(); //重置数据
          this.getPageList();
        }
      },
      bindRegionChange(e) {
        // console.log(e)
        let x = e.detail.value;
        if (this.region[2] != x[2]) { //变了才发起请求,非严格判断
          this.region = e.detail.value;
          this.resetQuery(); //重置数据
          this.getPageList();
        }
      },
    }

  }
</script>

<style lang="scss">
  /*搜索框跳转*/
  .search_input {
    height: 90rpx;
    padding: 10rpx 30rpx;
    background-color: white;

    .navigator-toSearch {
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(242, 242, 242);
      border-radius: 30rpx;
      color: #666;
    }
  }

  /*轮播图*/
  swiper {
    width: 100%;
    height: 400rpx;
    padding-top: 0px;
    text-align: center;

    .swiper-image {
      width: 90%;
    }
  }

  /*筛选栏*/
  .section {
    padding: 10rpx;
    display: flex;
    justify-content: space-around;
    background-color: #dbe2ef;
  }

  /*动态展示区*/
  .post-area {
    background-color: #eeeeee;
    padding: 5rpx;
  }
</style>
