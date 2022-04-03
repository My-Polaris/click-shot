// 提供咔嚓摄引平台作品页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

/*查询数据库,生成该页面所需的作品列表*/
function queryWorkList(selectId,pageNum,pageSize,myId) {//作品筛选id,页号,每页的大小,查询者的id
 let workList = []
 let lookPerson = DataBase.userList.find(x => x.id == myId);//找到查看的人,用于确定是否点赞了x作品,先不处理
 for(let dbWork of DataBase.workList){//遍历数据库的作品列表
   //找到发布者
   let dbUser = DataBase.userList.find(item => item.id == dbWork.pubId);
   
   let work = {
     id:dbWork.id,
     pic:dbWork.pictures[0],//封面图
     title:dbWork.title,//标题
     likeNum:dbWork.likeNum,//点赞量
     pubTime:dbWork.pubTime,//发布时间
     isLike:false,//该用户是否点赞了这条作品,先不处理
   }
   let person = {
     id:dbUser.id,
     pic:dbUser.pic,//用户头像固定
     name:dbUser.name,//用户名
   }
   workList.push({
     work,
     person
   })
  }
  //根据selectId进行排序,id为0是综合,id为1是最热,id为2是最新
  if(selectId==0);//综合排序先默认不排序
  else if(selectId==1)  workList.sort((a,b)=>{ return b.work.likeNum-a.work.likeNum });//按照点赞量降序排序
  else if(selectId==2)  workList.sort((a,b)=>{ return Date.parse(b.work.pubTime)-Date.parse(a.work.pubTime) });//按照发布时间降序排序
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
    const { selectId,pageNum,pageSize,myId } = params;
    let { total,pageList } = queryWorkList(selectId,pageNum,pageSize,myId);
    let { workButtonList } = DataBase.BaseInfo;//获取按钮数据
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
        List:pageList,
        buttonList:workButtonList
      }
    }
  }
}
