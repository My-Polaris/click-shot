// 提供咔嚓摄引平台用户详情页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

function queryUserInfo(myId,userId){
  //找用户详情,userInfo
  let userInfo = JSON.parse(JSON.stringify(DataBase.userList.find(x => x.id == userId)));//找到对应用户的信息(深拷贝,否则前台可以轻松的修改后台的对象或数组数据)
  
  return {userInfo};
}

export default {
  // 获取用户信息
  getUserInfo: config => {
    const { params } = config.body
    const { myId,userId } = params
    let { userInfo } = queryUserInfo(myId,userId);
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        userInfo,
      }
    }
  }
}