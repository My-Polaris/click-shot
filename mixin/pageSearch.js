/*分页数据及其重置方法、上拉刷新方法、触底提示方法、按钮数据及其切换方法的封装,适用于home页与works页*/
let mixin = {
  data() {
    return {
      selectId: 0,//按钮选项
      
      pageNum: 1, //当前的页号
      pageSize: 10,
      total: 0, //数据总数
      isloading: false, //是否正在申请数据(节流阀应用)
      pageList: [], //申请到的分页数据
    }
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
    this.getPageList()
  },
  // 下拉刷新的事件
  onPullDownRefresh() {
    // 1. 重置关键数据
    this.resetQuery();
  
    // 2. 重新发起请求
    this.getPageList(() => uni.stopPullDownRefresh())
  },
  methods: {
    //重置关键数据
    resetQuery() {
      //每次查询或者上拉刷新,需要初始化
      this.pageList = [] //清空pageList
      this.pageNum = 1; //查询的页数要置为1
      this.total = 0
      this.isloading = false
    },
    // 按钮变化
    buttonChange(id) {
      this.selectId = id
      this.resetQuery() //重置查页数据
      this.getPageList()
    },
  },
}

// 记住，最后一定要导出
export default mixin
