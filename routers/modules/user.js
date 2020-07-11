/*
    用户界面API
        功能：
            验证用户名
            注册
            登录
            修改个人信息
            
*/

// 引入
const express = require('express');
// 创建实例
const Router = express.Router();

// 引入封装的数据库
const query = require('../../databaseApi/mySQL/dbLink');

// 注册前验证用户名
Router.get('/uinfo', async (request, response) => {
    console.log('<----------验证用户名---------->');
    console.log('url=', request.url);
    console.log('path=', request.path);
    console.log('method=', request.method);
    console.log('params=', request.params);//结果为一个对象
    console.log('query=', request.query);//结果为一个对象
    console.log('body=', request.body);


    // 数据库处理
    let sql = `SELECT * FROM user`;
    let info = {};
    try {
        let prms = await query(sql);//[{},{}]
        // console.log(prms[0].username);

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
        info = {
            code: err.errno,
            msg: err.sqlMessage,
            flag: false,
            params: request.body
        }
        response.send(info)
    }
})

//  获取用户数据    动态路由
Router.get('/uinfo/:uid', async (request, response) => {
    console.log('<----------个人页---------->');
    console.log('url=', request.url);
    console.log('path=', request.path);
    console.log('method=', request.method);
    // 接收http://localhost:2020/user/uinfo/:uid 里的uid
    console.log('params=', request.params);//结果为一个对象
    // 接收http://localhost:2020/user/uinfo?uid=czj&psw=123 里的key=value
    console.log('query=', request.query);//结果为一个对象
    console.log('body=', request.body);


    // 数据库处理
    let sql = `SELECT * FROM shopcarinfo`;
    let info = {};
    try {
        let prms = await query(sql);
        if (prms.length > 0) {
            info = {
                code: 2000,
                text: "成功",
                flag: true,
                params: request.body
            }
        }
        response.send(info);
    } catch (err) {
        info = {
            code: 3000,
            text: "失败",
            flag: false,
            params: request.body
        }
        response.send(info)
    }
})

// 修改用户数据
Router.put('/uinfo', async (request, response) => {
    console.log('<----------个人页---------->');
    console.log('url=', request.url);
    console.log('path=', request.path);
    console.log('method=', request.method);
    console.log('params=', request.params);
    console.log('query=', request.query);
    console.log('body=', request.body);

    let sql = ``;
    let info = {};
    try {
        let prms = await query(sql);
        if (prms.length > 0) {
            info = {
                code: 2000,
                text: "成功",
                flag: true,
                params: request.body
            }
        }
        response.send(info);
    } catch (err) {
        info = {
            code: 3000,
            text: "失败",
            flag: false,
            params: request.body
        }
        response.send(info)
    }
})

// 注册
Router.post('/reg', (request, response) => {
    console.log('<----------注册页---------->');
    console.log('url=', request.url);
    console.log('path=', request.path);
    console.log('method=', request.method);
    console.log('params=', request.params);
    console.log('query=', request.query);
    console.log('body=', request.body);
    let info = {
        code: 2000,
        text: "成功",
        flag: true,
        params: request.body
    }
    response.send(info);
})
// 登录
Router.post('/login', (request, response) => {
    console.log('<----------登录页---------->');
    console.log('url=', request.url);
    console.log('path=', request.path);
    console.log('method=', request.method);
    console.log('params=', request.params);
    console.log('query=', request.query);
    console.log('body=', request.body);
    let info = {
        code: 2000,
        text: "成功",
        flag: true,
        params: request.body
    }
    response.send(info);
})

module.exports = Router;