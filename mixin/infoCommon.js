/*Info页面通用逻辑
  userInfo变量(个人详情),focus变量(是否关注),vuex导入myinfo和token,onLoad页面初始化的封装,请求关注函数*/
import { mapState } from 'vuex'
let mixin = {
  data() {
    return {
      userInfo: {}, //个人详情
      focus: false,
    }
  },
  computed: {
    ...mapState('m_user', ['myinfo', 'token'])
  },
  onLoad(options) {
    let myId = this.myinfo.id ? this.myinfo.id : -1; //如果没登陆的话传的myId是-1
    this.initPage(myId, options.id);
  },
  methods: {
    //请求关注或取消关注
    async submitFocus(index) {
      //index为0表示请求关注,为1表示请求取消关注
      let targetUser = this.userInfo;
      let myId = this.myinfo.id;
      if (this.token == '') return uni.$showMsg('要登录才能关注噢');
      if (index == 0) {
        console.log("发起关注用户  " + targetUser.id + " 的请求")
        targetUser.fansUserList.push(myId); //前台就负责++,没必要再查一次
      }
      else {
        console.log("发起取消关注用户 " + targetUser.id + " 的请求")
        let index = targetUser.fansUserList.indexOf(myId);
        if (index != -1) targetUser.fansUserList.splice(index, 1);
      }
      this.focus = !this.focus
    },
  },
}

// 记住，最后一定要导出
export default mixin
