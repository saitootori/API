/*
    路由主入口
*/

// 引入
const express = require('express');
// const getbody = require('body-parser');

// 创建实例
const Router = express.Router();

// 引入封装的数据库
const query = require('../databaseApi/mySQL/dbLink');

// 引入子路由
const userRouter = require('./modules/user')
const goodsRouter = require('./modules/goods')
const cartRouter = require('./modules/cart')
// 启用子路由
Router.use('/user', userRouter);
Router.use('/goods', goodsRouter);
Router.use('/cart', cartRouter);


// 统一设置中间件,对请求的参数进行处理放到request.body
Router.use(express.urlencoded());
// Router.use(getbody.json());
// Router.use(getbody.urlencoded({ extended: false }));



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
Router.get('/', async (request, response) => {
    console.log('<----------首页---------->');
    console.log('url=', request.url);
    console.log('path=', request.path);
    console.log('method=', request.method);
    console.log('params=', request.params);
    console.log('query=', request.query);
    console.log('body=', request.body);

    // 数据库处理
    let sql = `SELECT * FROM goodsinfo`;
    let info = {};
    try {
        // 连接数据库处理数据
        let prms = await query(sql);
        // 判断是否获取到数据
        if (prms.length > 0) {
            info = {
                code: 2000,
                msg: '数据库操作成功',
                flag: true,
                params: request.body
            }
        }
        response.send(info);
    } catch (err) {
        console.log(err);
        info = {
            code: err.errno,
            msg: err.sqlMessage,
            flag: false,
            params: request.body
        }
        response.send(info)
    }
})

module.exports = Router;