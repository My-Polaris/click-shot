// 提供咔嚓摄引平台作品页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

function queryUser(){
  let index = Mock.Random.integer(0,DataBase.userList.length-1);
  let user = JSON.parse(JSON.stringify(DataBase.userList[index]));//深拷贝该用户信息,否则前台可以轻松的修改后台的对象或数组数据
  return user;
}

export default {
  // 获取用户信息
  getUserInfo: config => {
    let userInfo = queryUser();
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        userInfo,
        token:Mock.Random.title(),
      }
    }
  }
}