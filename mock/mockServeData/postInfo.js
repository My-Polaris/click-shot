// 提供咔嚓摄引平台用户详情页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

/*查询动态信息,返回的postInfo分为person和post两个对象*/
function queryPostInfo(myId,postId){
  let dbPost = DataBase.postList.find(x => x.id==postId);//找到相应的动态
  let dbUser = DataBase.userList.find(x=> x.id==dbPost.pubId);//找到相应的用户 
  
  let userInfo = {//赋值动态相关的用户信息
    id:dbUser.id,
    pic:dbUser.pic,//头像源固定
    name:dbUser.name,
    sex:dbUser.sex,
    fansUserList:dbUser.fansUserList,//粉丝列表
    region:JSON.parse(JSON.stringify(dbUser.region)),//数组需要深拷贝
    tagList:JSON.parse(JSON.stringify(dbUser.tagList)),//数组需要深拷贝
  };
  let postInfo = {//动态的信息
    id:dbPost.id,
    goalIndex:dbPost.goalIndex,
    goalText:dbPost.goalText,
    moneyType:dbPost.moneyType,
    moenyText:dbPost.moneyText,
    title:dbPost.title,
    content:dbPost.content,
    pictures:JSON.parse(JSON.stringify(dbPost.pictures)),//数组需要深拷贝
    readNum:dbPost.readNum,
    starNum:dbPost.starNum,
    likeNum:dbPost.likeNum
  }
  return {
    userInfo,
    postInfo,
  }
}

export default {
  // 获取动态信息
  getPostInfo: config => {
    const { params } = config.body
    const { myId,postId } = params
    //console.log(myId,postId)
    //按理来说是应该返回star,like,focus的,不过只是mock数据没必要太较真,都默认返回false吧
    let { userInfo,postInfo } = queryPostInfo(myId,postId);
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        userInfo,
        postInfo,
        star:false,
        like:false,
        focus:false,
      }
    }
  }
}