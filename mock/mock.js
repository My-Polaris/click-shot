// 基于better-mock拦截相应的ajax请求,返回data.js里用的数据
import homeApi from '@/mock/mockServeData/home.js'
import Mock from 'better-mock/dist/mock.mp.js'
import workApi from '@/mock/mockServeData/works.js'

Mock.mock('api/home/baseData','get',homeApi.getBaseList)//获取基本数据
Mock.mock('api/home/postData','get',homeApi.getPostList)//获取动态数据

Mock.mock('api/works/worksData','get',workApi.getWorkList)//获取作品列表