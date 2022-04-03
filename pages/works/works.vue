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
        <view class="work-item" v-for="(item,index) in pageList" :key="index" v-if="index%2==x">
          <navigator :url="'/subpkg/workInfo/workInfo?id='+item.work.id">
            <image class="work-pic" mode="widthFix" :src="item.work.pic"></image>
          </navigator>
          <view class="work-info">
            <view class="work-text"><text>{{item.work.title}}</text></view>
            <view class="bottom-area">
              <navigator :url="'/subpkg/personInfo/personInfo?id='+item.person.id">
                <view class="person-info">
                  <image mode="aspectFill" class="person-headphoto" :src="item.person.pic"></image>
                  <view class="person-name"><text>{{item.person.name}}</text></view>
                </view>
              </navigator>
              <view class="like" @click="likeChange(item)">
                <uni-icons custom-prefix="iconfont" type="icon-dianzan" size="17" v-if="!item.work.isLike"></uni-icons>
                <uni-icons custom-prefix="iconfont" type="icon-_dianzan" size="17" v-else></uni-icons>
                <view class="like-num"><text>{{item.work.likeNum}}</text></view>
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
  import pageSearch from '@/mixin/pageSearch.js'
  export default {
    data() {
      return {
        buttonList: [{ id: 0, text: "综合" }, { id: 1, text: "最热" }, { id: 2, text: "最新" }], //ajax获取并覆盖的,这里提前写好只是为了方便看
      }
    },
    mixins: [pageSearch], //分页查询、上拉刷新、触底提示、按钮变换的混用
    components: { ButtonGroup, GoTop },
    onLoad() {
      this.getPageList();
    },
    computed: {
      ...mapState('m_user', ['myinfo', 'token']),
    },
    watch: { // 监听myinfo的变化去更新作品列表
      myinfo: {
        handler: function() {
          this.getPageList();
        },
        // 首次获取也得监听
        deep: true,
      }
    },
    methods: {
      //获取作品数据
      async getPageList(cb) {
        this.isloading = true
        const params = {
          selectId: this.selectId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          myId: this.myinfo.id,
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
        this.pageList = [...this.pageList, ...res.data.List];
        this.total = res.data.total
        this.buttonList = res.data.buttonList
      },
      // 点赞按钮
      likeChange(item) {
        if (this.token == '') return uni.$showMsg('要登录才能点赞噢');
        if (!item.work.isLike) {
          console.log("发起点赞作品 " + item.work.id + " 的请求")
          // this.myinfo.everLikeWork.push(item.work.id);//如果是浅拷贝的话,这里可以直接影响到后台数据,便于测试
          item.work.likeNum++;
        }
        else {
          console.log("发起取消点赞作品 " + item.work.id + " 的请求")
          // let x = this.myinfo.everLikeWork.indexOf(item.work.id);
          // if(x!=-1 ) this.myinfo.everLikeWork.splice(x,1);//找到点赞过的作品,删除之
          item.work.likeNum--;
        }
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
