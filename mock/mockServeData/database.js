// 咔嚓摄引的数据库
import Mock from 'better-mock/dist/mock.mp.js';

const userCount = 30;//生成的用户数据数量
const numCount = 1;//每个用户生成numCount条动态与作品

/*用户的构造函数*/
function User() {
  // 用户标签列表生成
  let tagList = [];
  for(let i=0;i<4;i++){//人物标签列表生成
    let tag = Mock.Random.integer(0,3);
    if(tagList.indexOf(tag) == -1)  tagList.push(tag);
  }
  tagList.sort();
  
  // 用户信息初始化
  this.id = Mock.Random.guid();
  this.pic = "https://s2.loli.net/2021/12/09/GMHoxCVkL7Xd4tu.jpg";//头像源固定
  this.name = Mock.Random.cword(Mock.Random.integer(1,5));
  this.sex = Mock.Random.integer(0, 1);//性别
  this.tagList = tagList;//0是已实名,1是自由摄影师,2是认证模特,3是会员
  
  //用户的一些行为路径
  this.pubPostList = [];//发布过的动态
  this.pubWorkList = [];//发布过的作品
  this.everLikePost = [];//喜欢过的动态的id
  this.everStarPost = [];//收藏过的动态的id
}

/*动态的构造函数*/
function Post(userId){
  let pictures = ['https://s2.loli.net/2021/12/09/i3CgucZITLeoftk.jpg','https://s2.loli.net/2021/12/09/6icfMBKpN8WdGau.jpg','https://s2.loli.net/2021/12/09/warxMnQDOULt2SY.jpg','https://s2.loli.net/2021/12/09/WzgdqxkMUIGSVt4.jpg'];//图片源暂时固定
  let content = "【寻长期 全/半天轻松踩点打卡试拍】\n  *协同踩点，配合试拍\n  *可拍模特卡，尝试不同风格场景，练镜头感，练摆拍\n  *踩点场景包括森系，清新，本地旅拍感/高级感打卡，情绪氛围，复古/电影感等\n【要求】\n  *自化妆比较上镜，不P图也还OK的\n  *好沟通。自需一些作品/样片\n  *工作日有闲(周末人多不拍)\n【摄影】留学审美辅修艺史，摄影创作爱好者。设备：大三元+虚化镜头+外拍灯。好沟通。专业后期返片\n【金额】可协商 500-1000元/天 根据上镜效果";//文案暂时固定
  
  this.pubId = userId;//发布者Id
  this.id = Mock.Random.guid();//该动态的id
  this.goalIndex = Mock.Random.integer(1,3);//动态的目的
  this.moneyType = Mock.Random.integer(0,1);//收费还是付费,暂不生成互勉
  this.money = Mock.Random.integer(200,500);//涉及的金额
  this.pictures = pictures;//照片组
  this.content = content;//文案
  this.readNum = Mock.Random.integer(2000,9000);//阅读量(千,返回万的话要自己后台处理加上'万'字)
  this.likeNum = Mock.Random.integer(2000,9000);//点赞量
  this.starNum = Mock.Random.integer(2000,9000);//收藏量
  this.pubTime = Mock.Random.date('yyyy-MM-dd');//发布时间
}

/*作品的构造函数*/
function Work(userId){
  let pictures = ['https://s2.loli.net/2021/12/09/aFmz9lCtGIMKYXA.jpg','https://s2.loli.net/2021/12/09/M6JNkxbmho7WKF5.jpg','https://s2.loli.net/2021/12/09/dFo97r63mTL85cV.jpg','https://s2.loli.net/2021/12/09/cQEYCJPI46rf3Mv.jpg'];//照片组固定
  let title = "夏日海边 | 在山海相见";//标题固定
  let content = "这一组的拍摄时间在下午四五点的样子，阳光洒在海面上特别好看，所以最好可以用反光板给人脸反下光，如果没有反光板就需要后期的时候对人脸和水面用蒙版分开调整\n相机：佳能6D2\n镜头：70-200";//文案固定
  
  this.pubId = userId;
  this.id = Mock.Random.guid();//该作品的id
  this.pictures = pictures;//照片组
  this.title = title;//标题
  this.content = content;//文案
  this.readNum = Mock.Random.integer(2000,9000);//阅读量(千,返回万的话要自己后台处理加上'万'字)
  this.likeNum = Mock.Random.integer(2000,9000);//点赞量
  this.starNum = Mock.Random.integer(2000,9000);//收藏量
  this.pubTime = Mock.Random.date('yyyy-MM-dd');//发布时间
}

/*生成用户*/
let userList = [];
for(let i=0;i<userCount;i++){
  let user = new User();
  userList.push(user);
}

/*依据用户列表生成动态列表与作品列表*/
let postList = [];
let workList = [];
for(let i=0;i<userList.length;i++){//遍历
  for(let j=0;j<numCount;j++){//每个用户发布numCount条动态与作品
    let post = new Post(userList[i].id);
    userList[i].pubPostList.push(post.id);//用户的行为路径要更新(发布动态)
    let work = new Work(userList[i].id);
    userList[i].pubWorkList.push(work.id);//用户的行为路径要更新(发布作品)
    
    postList.push(post);
    workList.push(work);
  }
}

export default {
  userList,
  postList,
  workList,
}

// console.log(userList);
// console.log(postList);
// console.log(workList);