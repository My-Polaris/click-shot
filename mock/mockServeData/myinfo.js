// 提供咔嚓摄引平台用户详情页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

function queryUserInfo(userId){
  //找用户详情,userIndo
  let userInfo = JSON.parse(JSON.stringify(DataBase.userList.find(x => x.id == userId)));//找到对应用户的信息(深拷贝,否则前台可以轻松的修改后台的对象或数组数据)
  
  //找发布的动态的详情
  let pubPostList = [];
  DataBase.postList.forEach(item => {
    if(item.pubId==userId){//深拷贝并添加进发布动态数组
      let post = JSON.parse(JSON.stringify(item));
      pubPostList.push(post);
    }
  })
  
  //找到发布的作品的详情
  let pubWorkList = [];
  DataBase.workList.forEach(item => {
    if(item.pubId==userId){//深拷贝并添加进发布作品数组
      let post = JSON.parse(JSON.stringify(item));
      pubWorkList.push(post);
    }
  })
  
  return {userInfo,pubPostList,pubWorkList};
}

export default {
  // 获取用户信息
  getUserInfo: config => {
    const { params } = config.body
    const { userId } = params
    let { userInfo,pubPostList,pubWorkList } = queryUserInfo(userId);
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        userInfo,
        pubPostList,
        pubWorkList,
      }
    }
  }
}