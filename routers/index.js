/*
    路由主入口
*/

// 引入
const express = require('express');
// 创建实例
const Router = express.Router();

// 引入子路由
const userRouter = require('./modules/user')
const indexRouter = require('./modules/indexPage')
// 启用子路由
Router.use('/user', userRouter);
Router.use('/', indexRouter);

// 统一设置中间件,对请求的参数进行处理放到request.body
Router.use(express.urlencoded());


// 自定义中间件,use接收所有请求
// app.use('/', (request, response, next) => {
//     console.log('url=', request.url);
//     console.log('path=', request.path);
//     console.log('method=', request.method);
//     console.log('params=', request.params);
//     console.log('query=', request.query);
//     // console.log('response=', response);
//     response.send('首页')
// })

// 获取首页数据
// Router.get('/', (request, response) => {
//     console.log('<----------首页---------->');
//     console.log('url=', request.url);
//     console.log('path=', request.path);
//     console.log('method=', request.method);
//     console.log('params=', request.params);
//     console.log('query=', request.query);
//     console.log('body=', request.body);
//     let info = {
//         code: 2000,
//         text: "成功",
//         flag: true,
//         params: request.body
//     }
//     response.send(info);
// })

module.exports = Router;