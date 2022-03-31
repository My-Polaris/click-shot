<template>
  <view class="page-view">
    <!-- 自定义按钮组组件,来源于buttonList，同时传入选中的id-->
    <view style="margin:20rpx">
      <button-group :itemList="buttonList" :selectId="selectId" @buttonChange="buttonChange" :height="50" :width="210">
      </button-group>
    </view>

    <!-- 作品展示区 -->
    <view class="work-area">
      <!-- 两栏布局 -->
      <view class="width:360rpx" v-for="x of 2">
        <view class="work-item" v-for="(item,index) in workList" :key="index" v-if="index%2==x">
          <navigator url="/subpkg/workInfo/workInfo">
            <image class="work-pic" mode="widthFix" :src="item.work.pic"></image>
          </navigator>
          <view class="work-info">
            <view class="work-text"><text>{{item.work.title}}</text></view>
            <view class="bottom-area">
              <navigator url="/subpkg/personInfo/personInfo">
                <view class="person-info">
                  <image mode="aspectFill" class="person-headphoto" :src="item.person.pic"></image>
                  <view class="person-name"><text>{{item.person.name}}</text></view>
                </view>
              </navigator>
              <view class="like" @click="likeChange(item)">
                <uni-icons custom-prefix="iconfont" type="icon-dianzan" size="17" v-if="!item.work.isLike"></uni-icons>
                <uni-icons custom-prefix="iconfont" type="icon-_dianzan" size="17" v-else></uni-icons>
                <view class="like-num"><text>{{item.work.clickNum}}</text></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 回到顶部按钮 -->
    <go-top></go-top>

  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import ButtonGroup from '@/components/ButtonGroup/ButtonGroup.vue'
  import GoTop from '@/components/GoTop/GoTop.vue'
  export default {
    data() {
      return {
        buttonList: [{ id: 0, text: "综合" }, { id: 1, text: "最热" }, { id: 2, text: "最新" }],
        selectId: 0,

        pageNum: 1, //当前的页号
        pageSize: 10, //每页的数据数量
        total: 0, //作品数据总数
        isloading: false, //是否正在申请数据(节流阀应用)
        workList: [], //作品列表
      }
    },
    components: { ButtonGroup, GoTop },
    onShow() {
      this.getWorkList();
    },
    // 触底的事件
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.pageNum * this.pageSize >= this.total) return uni.$showMsg('亲,你已经划到底部了呢');

      // 判断是否正在请求其它数据，如果是，则不发起额外的请求
      if (this.isloading) return;

      // 让页码值自增 +1
      this.pageNum += 1
      // 重新获取列表数据
      this.getWorkList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.resetQuery();

      // 2. 重新发起请求
      this.getWorkList(() => uni.stopPullDownRefresh())
    },
    computed: {
      ...mapState('m_user', ['userinfo','token']),
    },
    watch: {
      // 本来是想监听userinfo的变化去更新作品列表的,现在直接用onShow生命周期代替onLoad,每次展示页面都会重新加载
      // userinfo: {
      //   handler: function() {
      //     this.getWorkList();
      //   },
      //   // 首次获取也得监听
      //   deep: true,
      // }
    },
    methods: {
      //获取作品数据
      async getWorkList(cb) {
        this.isloading = true
        const params = {
          selectId: this.selectId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          myId: this.userinfo.id,
        }
        const {
          data: res
        } = await uni.$http.get('api/works/worksData', { params })
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()

        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 请求成功，为 data 中的数据赋值
        this.workList = [...this.workList, ...res.data.workList];
        this.total = res.data.total
      },
      //重置关键数据
      resetQuery() {
        //每次查询或者上拉刷新,需要初始化
        this.workList = [] //清空workList
        this.pageNum = 1; //查询的页数要置为1
        this.total = 0
        this.isloading = false
      },
      // 按钮变化
      buttonChange(id) {
        this.selectId = id
        this.resetQuery() //重置查页数据
        this.getWorkList()
      },
      // 点赞按钮
      likeChange(item) {
        if(this.token=='') return uni.$showMsg('要登录才能点赞噢');
        if (item.work.isLike) console.log("发起点赞作品 " + item.work.id + " 的请求")
        else console.log("发起取消点赞作品 " + item.work.id + " 的请求")
        item.work.isLike = !item.work.isLike
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-view {
    background-color: #eeeeee;

    /* 作品展示区 */
    .work-area {
      /* display: flex; */
      /* 默认值。灵活的项目将水平显示，正如一个行一样 */
      /* flex-direction: row; */
      /* 让弹性盒元素在必要的时候拆行 */
      /* flex-wrap: wrap; */
      /*瀑布流实现的方法:
      1.column方案(分流,竖着显示的,不适用于懒加载因此没用)
      2.直接两栏布局(代码冗余,可以直接在js处理为左右两栏)
      3.js+absolute方案(企业常用,较复杂)
      4.flex方案(失效,原因还没摸清)*/
      display: flex;
      justify-content: space-around;
      width: 100%;
      // column-count: 2;
      // column-gap: 0px;

      .work-item {
        /* 这里不能设置高度，这样整个item才会随着内部的大小改变而改变*/
        width: 360rpx;
        // height: 100%;
        padding: 1rpx 1rpx;
        background-color: white;
        border-radius: 15rpx;
        margin-bottom: 10rpx;

        /* 设置item与item之间的间隔 */
        .work-pic {
          /* 宽度固定，高度随之拉伸 */
          width: 100%;
          border-radius: 15rpx;
        }

        .work-info {
          padding: 8rpx 20rpx;

          .work-text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .bottom-area {
            display: flex;
            /* 类似于左靠左，右靠右 */
            justify-content: space-between;
            margin: 15rpx 0rpx;

            .person-info {
              display: flex;
              align-items: center;

              /* 位于容器的开头，默认值。 */
              /* justify-content: flex-start; */
              .person-headphoto {
                width: 43rpx;
                height: 43rpx;
                border-radius: 50%;
                margin-right: 5rpx;
              }

              .person-name {
                display: flex;
                /* 元素纵轴居中放置 */
                /* justify-content: center; */
                align-items: center;
                color: #52616b;

                text {
                  font-size: 24rpx;
                }
              }
            }

            .like {
              display: flex;
              justify-content: center;
              align-items: center;

              .like-num {
                text {
                  font-size: 24rpx;
                  color: #52616b;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
