// 基于better-mock拦截相应的ajax请求,返回data.js里用的数据
import homeApi from '@/mock/mockServeData/home.js'
import Mock from 'better-mock/dist/mock.mp.js'
import workApi from '@/mock/mockServeData/works.js'
import loginApi from '@/mock/mockServeData/login.js'
import personinfoApi from '@/mock/mockServeData/personInfo.js'
import postinfoApi from '@/mock/mockServeData/postInfo.js'
import workinfoApi from '@/mock/mockServeData/workInfo.js'
import appointsubApi from '@/mock/mockServeData/appointSub.js'
import myinfoApi from '@/mock/mockServeData/myinfo.js'
import helpApi from '@/mock/mockServeData/help.js'
import applyvipApi from '@/mock/mockServeData/applyVip.js'

Mock.mock('api/home/baseData','get',homeApi.getBaseList)//获取基本数据
Mock.mock('api/home/postData','get',homeApi.getPostList)//获取动态数据

Mock.mock('api/works/worksData','get',workApi.getWorkList)//获取作品列表
Mock.mock('/api/login/userData','get',loginApi.getUserInfo)//随机获取一个用户用于登陆

Mock.mock('/api/personinfo/userData','get',personinfoApi.getUserInfo)//获取用户信息

Mock.mock('/api/postinfo/postData','get',postinfoApi.getPostInfo)//获取动态相关信息

Mock.mock('/api/workinfo/workData','get',workinfoApi.getWorkInfo)//获取作品相关信息

Mock.mock('/api/appointsub/userData','get',appointsubApi.getUserInfo)//获取用户相关信息

Mock.mock('/api/myinfo/userData','get',myinfoApi.getUserInfo)//获取用户相关信息

Mock.mock('/api/help/questionData','get',helpApi.getQuestionList)//获取帮助中心问题相关信息

Mock.mock('/api/applyVip/vipData','get',applyvipApi.getVipData)//获取会员界面相关信息