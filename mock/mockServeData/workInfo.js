// 提供咔嚓摄引平台用户详情页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

function queryWorkInfo(myId,workId){
  let dbWork = DataBase.workList.find(x => x.id==workId);//找到相应的作品
  let dbUser = DataBase.userList.find(x=> x.id==dbWork.pubId);//找到相应的用户 
  
  let userInfo = {//赋值动态相关的用户信息
    id:dbUser.id,
    pic:dbUser.pic,//头像源固定
    name:dbUser.name,
    sex:dbUser.sex,
    fansUserList:dbUser.fansUserList,//粉丝列表
    region:JSON.parse(JSON.stringify(dbUser.region)),//数组需要深拷贝
    tagList:JSON.parse(JSON.stringify(dbUser.tagList)),//数组需要深拷贝
  };
  let workInfo = {//动态的信息
    id:dbWork.id,
    title:dbWork.title,
    content:dbWork.content,
    pictures:JSON.parse(JSON.stringify(dbWork.pictures)),//数组需要深拷贝
    readNum:dbWork.readNum,
    starNum:dbWork.starNum,
    likeNum:dbWork.likeNum,
    pubTime:dbWork.pubTime,
  }
  return {
    userInfo,
    workInfo,
  }
}


export default {
  // 获取动态信息
  getWorkInfo: config => {
    const { params } = config.body
    const { myId,workId } = params
    // console.log(myId,workId)
    //按理来说是应该返回star,like,focus的,不过只是mock数据没必要太较真,都默认返回false吧
    let { userInfo,workInfo } = queryWorkInfo(myId,workId);
    //测试轮播图样式
    workInfo.pictures[1] = "https://s2.loli.net/2021/12/09/HyUdIlbZPABW2kS.jpg"
    workInfo.pictures[3] = "https://s2.loli.net/2021/12/09/6icfMBKpN8WdGau.jpg"
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        userInfo,
        workInfo,
        star:false,
        like:false,
        focus:false,
      }
    }
  }
}