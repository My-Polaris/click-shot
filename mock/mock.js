// 基于better-mock拦截相应的ajax请求,返回data.js里用的数据
import homeApi from '@/mock/mockServeData/home.js'
import Mock from 'better-mock/dist/mock.mp.js'
import workApi from '@/mock/mockServeData/works.js'
import loginApi from '@/mock/mockServeData/login.js'
import personinfoApi from '@/mock/mockServeData/personInfo.js'

Mock.mock('api/home/baseData','get',homeApi.getBaseList)//获取基本数据
Mock.mock('api/home/postData','get',homeApi.getPostList)//获取动态数据

Mock.mock('api/works/worksData','get',workApi.getWorkList)//获取作品列表
Mock.mock('/api/login/userData','get',loginApi.getUserInfo)//随机获取一个用户用于登陆

Mock.mock('/api/personinfo/userData','get',personinfoApi.getUserInfo)//获取用户信息