// 提供咔嚓摄引平台用户详情页面的的数据,
import Mock from 'better-mock/dist/mock.mp.js'
//提取数据库
import DataBase from '@/mock/mockServeData/database.js'

export default {
  // 获取用户信息
  getVipData: config => {
    let vipPriceList = DataBase.BaseInfo.vipPriceList;
    let vipPowerList = DataBase.BaseInfo.vipPowerList;
    let vipTitleList = DataBase.BaseInfo.vipTitleList;
    return {
      meta: {
        status: 200,
        msg: '获取成功',
      },
      data: {
        vipPriceList,
        vipPowerList,
        vipTitleList
      }
    }
  }
}