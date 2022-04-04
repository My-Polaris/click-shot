// 咔嚓摄引的数据库
import Mock from 'better-mock/dist/mock.mp.js';

// 拓展mockjs
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})

const userCount = 30; //生成的用户数据数量
const numCount = 4; //每个用户生成numCount条动态与作品

/*平台基础数据*/
const BaseInfo = {
  swiperList: [{ img_src: 'https://s2.loli.net/2021/12/09/HyUdIlbZPABW2kS.jpg' },
    { img_src: 'https://s2.loli.net/2021/12/09/EP5Z8z6OSLtrNYo.jpg' },
    { img_src: 'https://s2.loli.net/2021/12/09/YK7Rf3OtxNhuED5.jpg' },
    { img_src: 'https://s2.loli.net/2021/12/09/9zA6JIV4yqEc2ms.jpg' },
    { img_src: 'https://s2.loli.net/2021/12/09/zyRHoDecUCQ2nML.jpg' }
  ], //轮播图
  goalList: ["目的", "找摄影师", "找模特", "找网店商家"], //目的列表
  sexList: ['性别', '女', '男'], //性别列表
  region: ['全部', '全部', '全部'], //默认地区设置
  postButtonList: [{ id: 0, text: "收费区" }, { id: 1, text: "付费区" }, { id: 2, text: "互勉区" }], //按钮类型列表
  moneyTypeList: ['收费', '付费', '互勉'],
  //作品相关
  workButtonList: [{ id: 0, text: "综合" }, { id: 1, text: "最热" }, { id: 2, text: "最新" }],
  // 帮助中心的问题
  questionList:[
        {
          id:1,
          question:"咔嚓摄引是什么?",
          answer:"咔嚓摄引是一个摄影约拍平台，有拍摄需求的客户可以在本平台找合适的摄影师解决他们的需求。摄影师也可以在本平台找心怡的模特完成他们的创作。并且本平台有动态圈的社区功能，给我们的用户提供展示自己作品的机会。",
          isActive:false
        },
        {
          id:2,
          question:"我不是模特,可以约拍吗?",
          answer:"任何想拍照的人都可以叫模特,您想拍照,就可以到咔嚓摄引上发布自己的约拍需求。",
          isActive:false
        },
        {
          id:3,
          question:"如何成为认证摄影师/认证模特?",
          answer:"获取认证身份的方式是实名+摄影作品/模卡。\n具体操作：首页->我的->身份认证",
          isActive:false
        },
        {
          id:4,
          question:"发起约拍为什么需要提交基础定金?",
          answer:"基础定金是为动态发布者筛选真正有诚意想要约拍的一个门槛，若三天内双方未完成确定或交易未达成，基础定金自动返还。",
          isActive:false
        },
        {
          id:5,
          question:"平台的提成机制是怎么回事?",
          answer:"在获得认证摄影师/认证模特的身份后，作为收费方接单时会获得平台给予的提成。",
          isActive:false
        },
        {
          id:6,
          question:"平台一共有几种身份呀?对应了哪些权限呢?",
          answer:"未实名用户：浏览页面。\n登录用户：可以发起约拍\n已实名用户：允许发布动态。\n认证摄影师or认证模特：以收费方完成交易时会获得平台给予的提成。\n会员：拥有定金减免、平台优先推广等权益",
          isActive:false
        },
        {
          id:7,
          question:"我觉得你们平台不错,想合作一下~",
          answer:"商务合作可以联系vx：2499713088~",
          isActive:false
        },
        {
          id:8,
          question:"这个平台真是太棒了,我也想加入你们摄摄兄弟团队",
          answer:"可以发送简历至a2499713088@qq.com~",
          isActive:false
        },
      ],
  // 各类会员的信息列表(时长,原价,现价)
  vipPriceList:[
    {id:0,time:"1个月",basePrice:15,realPrice:48,isActive:true},
    {id:1,time:"6个月",basePrice:70,realPrice:288,isActive:false},
    {id:2,time:"1年",basePrice:115,realPrice:576,isActive:false}
  ],
  //会员权益头部
  vipTitleList:['服务权益','非会员','会员'],
  //会员权益列表
  vipPowerList:[
    {"server":"约拍基础定金","not_vip":"￥1.00","vip":"每日首次免费"},
    {"server":"发布限制","not_vip":"每周1条","vip":"每周2条"},
    {"server":"动态推广","not_vip":"基本推送","vip":"更高推广率"},
    {"server":"作品排序","not_vip":"仅最近","vip":"综合最热最近"},
    {"server":"会员醒目标识","not_vip":"无","vip":"有"}
  ],
}
/*用户的构造函数*/
function User() {
  // 用户标签列表生成
  let tagList = [];
  for (let i = 0; i < 4; i++) { //人物标签列表生成
    let tag = Mock.Random.integer(0, 3);
    if (tagList.indexOf(tag) == -1) tagList.push(tag);
  }
  tagList.sort();
  // 用户所处地区生成
  let region = [Mock.Random.province(), Mock.Random.city(), Mock.Random.county()];

  // 用户信息初始化
  this.id = Mock.Random.guid();
  this.pic = "https://s2.loli.net/2021/12/09/GMHoxCVkL7Xd4tu.jpg"; //头像源固定
  this.name = Mock.Random.cword(Mock.Random.integer(1, 5));
  this.sex = Mock.Random.integer(0, 1); //性别
  this.telphone = Mock.Random.phone();//手机号码生成
  this.tagList = tagList; //0是已实名,1是自由摄影师,2是认证模特,3是会员
  this.region = region; //地区赋值
  this.introduce = "一位平平无奇的天才摄影师...\n自由摄影 | 分享美好\n邮箱：a2499713088@qq.com"; //用户自我介绍,暂时固定

  //用户的一些行为路径,有用Set的想法,但Set和Map的深度克隆还得另写,所以先用数组吧
  this.pubPostList = []; //发布过的动态
  this.pubWorkList = []; //发布过的作品
  this.focusUserList = []; //关注过的博主
  this.fansUserList = []; //粉丝用户列表
  this.everLikePost = []; //喜欢过的动态的id
  this.everStarPost = []; //收藏过的动态的id
  this.everLikeWork = []; //喜欢过的作品的id
  this.everStarWork = []; //收藏过的作品的id
  this.finishDealList = []; //用户完成的交易单数(交易单id)
}

/*动态的构造函数*/
function Post(userId) {
  let pictures = ['https://s2.loli.net/2021/12/09/i3CgucZITLeoftk.jpg',
    'https://s2.loli.net/2021/12/09/6icfMBKpN8WdGau.jpg', 'https://s2.loli.net/2021/12/09/warxMnQDOULt2SY.jpg',
    'https://s2.loli.net/2021/12/09/WzgdqxkMUIGSVt4.jpg'
  ]; //图片源暂时固定
  let content =
    "【寻长期 全/半天轻松踩点打卡试拍】\n  *协同踩点，配合试拍\n  *可拍模特卡，尝试不同风格场景，练镜头感，练摆拍\n  *踩点场景包括森系，清新，本地旅拍感/高级感打卡，情绪氛围，复古/电影感等\n【要求】\n  *自化妆比较上镜，不P图也还OK的\n  *好沟通。自需一些作品/样片\n  *工作日有闲(周末人多不拍)\n【摄影】留学审美辅修艺史，摄影创作爱好者。设备：大三元+虚化镜头+外拍灯。好沟通。专业后期返片\n【金额】可协商 500-1000元/天 根据上镜效果"; //文案暂时固定

  this.pubId = userId; //发布者Id
  this.id = Mock.Random.guid(); //该动态的id
  this.goalIndex = Mock.Random.integer(1, 3); //动态的目的
  this.goalText = BaseInfo.goalList[this.goalIndex];//目的文本
  this.moneyType = Mock.Random.integer(0, 1); //收费还是付费,暂不生成互勉
  this.money = Mock.Random.integer(200, 500); //涉及的金额
  this.moneyText = BaseInfo.moneyTypeList[this.moneyType]+this.money+"元";//收付费文本
  this.pictures = pictures; //照片组
  this.title =this.goalText+","+this.moneyText,
  this.content = content; //文案
  this.readNum = Mock.Random.integer(2000, 9000); //阅读量(千,返回万的话要自己后台处理加上'万'字)
  this.likeNum = Mock.Random.integer(2000, 9000); //点赞量
  this.starNum = Mock.Random.integer(2000, 9000); //收藏量
  this.pubTime = Mock.Random.date('yyyy-MM-dd'); //发布时间
}

/*作品的构造函数*/
function Work(userId) {
  let pictures = ['https://s2.loli.net/2021/12/09/aFmz9lCtGIMKYXA.jpg',
    'https://s2.loli.net/2021/12/09/M6JNkxbmho7WKF5.jpg', 'https://s2.loli.net/2021/12/09/dFo97r63mTL85cV.jpg',
    'https://s2.loli.net/2021/12/09/cQEYCJPI46rf3Mv.jpg'
  ]; //照片组固定
  let title = "夏日海边 | 在山海相见"; //标题固定
  let content =
    "这一组的拍摄时间在下午四五点的样子，阳光洒在海面上特别好看，所以最好可以用反光板给人脸反下光，如果没有反光板就需要后期的时候对人脸和水面用蒙版分开调整\n相机：佳能6D2\n镜头：70-200"; //文案固定

  this.pubId = userId;
  this.id = Mock.Random.guid(); //该作品的id
  this.pictures = pictures; //照片组
  this.title = title; //标题
  this.content = content; //文案
  this.readNum = Mock.Random.integer(2000, 9000); //阅读量(千,返回万的话要自己后台处理加上'万'字)
  this.likeNum = Mock.Random.integer(2000, 9000); //点赞量
  this.starNum = Mock.Random.integer(2000, 9000); //收藏量
  this.pubTime = Mock.Random.date('yyyy-MM-dd'); //发布时间
}

/*生成用户*/
let userList = [];
for (let i = 0; i < userCount; i++) {
  let user = new User();
  userList.push(user);
}

/*依据用户列表生成动态列表与作品列表*/
let postList = [];
let workList = [];
for (let i = 0; i < userList.length; i++) { //遍历
  for (let j = 0; j < numCount; j++) { //每个用户发布numCount条动态与作品
    let post = new Post(userList[i].id);
    userList[i].pubPostList.push(post.id); //用户的行为路径要更新(发布动态)
    let work = new Work(userList[i].id);
    userList[i].pubWorkList.push(work.id); //用户的行为路径要更新(发布作品)

    postList.push(post);
    workList.push(work);
  }
}

export default {
  userList,
  postList,
  workList,
  BaseInfo
}
