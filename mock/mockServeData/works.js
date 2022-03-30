// 提供咔嚓摄引平台作品页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

/*查询数据库,生成该页面所需的作品列表*/
function queryWorkList(selectId,pageNum,pageSize) {
 let workList = []
 for(let dbWork of DataBase.workList){
   //找到发布者
   let dbUser = DataBase.userList.find(item => item.id == dbWork.pubId);
   
   let work = {
     id:dbWork.id,
     pic:dbWork.pictures[0],//封面图
     title:dbWork.title,//标题
     clickNum:dbWork.likeNum,//点赞量
     isLike:false,//该用户是否点赞了这条作品,先不处理,因为需要获取点击者的信息
   }
   let person = {
     pic:dbUser.pic,//用户头像固定
     name:dbUser.name,//用户名
   }
   workList.push({
     work,
     person
   })
  }
  let pageList = workList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))
  return {
    total:workList.length,
    pageList,
  };
}

export default {
  // 获取作品列表
  getWorkList: config => {
    const { params } = config.body;
    const { selectId,pageNum,pageSize } = params;
    let { total,pageList } = queryWorkList(selectId,pageNum,pageSize);
    //测试一下瀑布流
    pageList[1].work.pic = "https://s2.loli.net/2021/12/09/HyUdIlbZPABW2kS.jpg"
    pageList[2].work.pic = "https://s2.loli.net/2021/12/09/6icfMBKpN8WdGau.jpg"
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        total,
        workList:pageList
      }
    }
  }
}
