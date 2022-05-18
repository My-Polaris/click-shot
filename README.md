# 咔嚓摄引平台

## 一、项目背景

随着互联网与摄影的发展，摄影工作室与自由摄影师越来越多，人们的约拍需求也越来越大，目前约拍app市场匮乏，比较火的也仅有微博，小红书，而微博约拍的安全与可靠性较低，而且约拍也只是其衍生功能，因此需要一类专门化，规范化、平台化的app来解决此问题。

咔嚓摄引是一个摄影约拍平台，有拍摄需求的客户可以在本平台找合适的摄影师解决他们的需求，摄影师也可以在本平台找心怡的模特完成他们的创作。

## 二、平台特点

1. 摄影师提成机制：摄影师在平台接单可以获得提成。（认证摄影师能获取更高的提成）

2. 动态分区清晰：动态清晰的分为收费区、付费区与互勉区，收费区的内容为收费给予服务的动态，付费区的内容为付费寻求服务的动态，互勉区则为不需要金钱交易的动态。

3. 约拍按钮门槛：点击约拍按钮需要支付一元定金，若双方达成交易则收取这一元定金，一天之内未达成交易则退回。

4. 平台交易定金机制：生成交易单的前提是支付方提交定金，服务结束后提交尾款时资金才流通到摄影师账户上，在此间的金额都由平台管理。

5. 层层分级的标签：实名用户、自由摄影师、约拍模特，VIP，每项Label都代表着相应的权限与认定。



## 三、业务逻辑

![业务流程图.png](https://s2.loli.net/2022/05/19/ctIh5BnASGjZmXy.png)

## 四、系统功能设计

### 功能模块划分（共25个功能模块）

![功能模块划分.jpg](https://s2.loli.net/2022/05/19/w2HQU3SZGDyTlLc.jpg)

​	详见产品原型挂载地址：https://qy3pw9.axshare.com/

## 五、平台技术栈及其环境

平台基于uni-app开发，运行环境为微信小程序，由于云库丢失与平台的社区特性，应用暂未上架。

当前版本为前端体验开发版，数据由mock.js模拟并驱动，涉及交易的功能未上传。

## 六、平台部分界面展示

<img src="https://s2.loli.net/2022/05/19/Xy9tjJbVvl3WYdh.jpg" alt="咔嚓摄引平台-首页.jpg" style="zoom:20%;" /> <img src="https://s2.loli.net/2022/05/19/AcdMWhGBFxETDsm.jpg" alt="咔嚓摄引平台-作品页.jpg" style="zoom:20%;" /> <img src="https://s2.loli.net/2022/05/19/DdikvQW6K5xHqwF.jpg" alt="咔嚓摄引平台-动态详情.jpg" style="zoom:20%;" />  <img src="https://s2.loli.net/2022/05/19/zU18tFG5BILMY7x.jpg" alt="咔嚓摄引平台-编辑资料.jpg" style="zoom:20%;" /> <img src="https://s2.loli.net/2022/05/19/QbjWvhTcayk51Re.jpg" alt="咔嚓摄引平台-开通会员.jpg" style="zoom:20%;" />  <img src="https://s2.loli.net/2022/05/19/eSRlzfWgIApm2jB.jpg" alt="咔嚓摄引平台-交易单详情.jpg" style="zoom:20%;" />

<img src="https://s2.loli.net/2022/05/19/cdY9jqCQ4BT1W3O.jpg" alt="咔嚓摄引平台-约拍信息提交.jpg" style="zoom:25%;" />  <img src="https://s2.loli.net/2022/05/19/lwcsBnuHgoWpMEK.jpg" alt="咔嚓摄引平台-帮助中心.jpg" style="zoom:25%;" /><img src="https://s2.loli.net/2022/05/19/id5ohuK4Mz3GE2a.jpg" alt="咔嚓摄引平台-关于我们.jpg" style="zoom:20%;" />  