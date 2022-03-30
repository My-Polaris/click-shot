// 提供咔嚓摄引平台主页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

/*平台基础数据*/
const swiperList = [{ img_src: 'https://s2.loli.net/2021/12/09/HyUdIlbZPABW2kS.jpg' },
          { img_src: 'https://s2.loli.net/2021/12/09/EP5Z8z6OSLtrNYo.jpg' },
          { img_src: 'https://s2.loli.net/2021/12/09/YK7Rf3OtxNhuED5.jpg' },
          { img_src: 'https://s2.loli.net/2021/12/09/9zA6JIV4yqEc2ms.jpg' },
          { img_src: 'https://s2.loli.net/2021/12/09/zyRHoDecUCQ2nML.jpg' }
        ];//轮播图
const goalList = ["目的","找摄影师", "找模特", "找网店商家"];//目的列表
const sexList = ['性别','女', '男'];//性别列表
const region =  ['全部', '全部', '全部']; //默认地区设置
const buttonList = [{ id: 0, text: "收费区" }, { id: 1, text: "付费区" }, { id: 2, text: "互勉区" }]; //按钮类型列表
const moneyTypeList = ['收费','付费','互勉']

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
      goalIndex:dbPost.goalIndex,
      moneyType:dbPost.moneyType,
      title:goalList[dbPost.goalIndex]+","+moneyTypeList[dbPost.moneyType]+dbPost.money+"元",
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
        buttonList, //按钮类型列表
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
