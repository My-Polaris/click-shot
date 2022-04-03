// 提供咔嚓摄引平台主页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

/*查询数据库,生成该页面所需的动态列表*/
function queryPostList(goal,sex,region,type,pageNum,pageSize) {
  let postList = [];
  for(let dbPost of DataBase.postList){
    //找到发布者
    let dbUser = DataBase.userList.find(item => item.id == dbPost.pubId);
    
    //数据库查询
    let person = {//赋值动态相关的用户信息
      id:dbUser.id,
      pic:dbUser.pic,//头像源固定
      name:dbUser.name,
      sex:dbUser.sex,
      tagList:JSON.parse(JSON.stringify(dbUser.tagList)),//数组需要深拷贝
    };
    let post = {//动态的信息
      id:dbPost.id,
      goalIndex:dbPost.goalIndex,
      moneyType:dbPost.moneyType,
      title:dbPost.title,
      content:dbPost.content,
      pictures:JSON.parse(JSON.stringify(dbPost.pictures)),//数组需要深拷贝
      readNum:dbPost.readNum
    }
    postList.push({
      person,
      post,
    })
  }
  
  //根据传参进行筛选
  let resultList = postList.filter(x => {
    if(sex!= 2 && sex!=x.person.sex) return false;//用户性别不符合,sex==2表示不筛选性别
    if(goal>=1 && goal!=x.post.goalIndex) return false;//有目的筛选且不符合
    if(type!=x.post.moneyType) return false;//收付费不符合
    //还有个地区不符合的判断,这里先不处理地区
    return true;
  })
  let pageList = resultList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))
  return {
    total:resultList.length,
    pageList,
  };
}

export default {
  //获取基本数据
  getBaseList: config => {
    let baseInfo = JSON.parse(JSON.stringify(DataBase.BaseInfo));//深拷贝平台基础数据
    let { swiperList,goalList,sexList,region,postButtonList } = baseInfo;
    console.log("成功获取页面基础信息~")
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        swiperList,// 轮播图数据,暂时只提供图片地址属性
        goalList, //商家类型数据
        sexList, //性别类型数据
        region, //默认地区设置
        buttonList:postButtonList, //按钮类型列表
      }
    }
  },
  //获取动态数据
  getPostList: config => {
    const {params} = config.body;
    const {goal,sex,region,type,pageNum=1,pageSize=10} = params;//pageSize默认是显示10行
    console.log("发起请求获取动态列表,参数为-",params);
    let {total,pageList} = queryPostList(goal,sex,region,type,pageNum,pageSize);
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        total,
        List:pageList,
      }
    }
  }
}
