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
const query = require('../../databaseApi/MySQL/dbLink');

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

//  获取用户数据    动态路由
Router.get('/uinfo/:uid', async (request, response) => {
    console.log('<----------个人页---------->');
    console.log('url=', request.url);       //请求地址
    console.log('path=', request.path);     //请求地址
    console.log('method=', request.method); //请求方式
    console.log('params=', request.params); //结果为一个对象
    console.log('query=', request.query);   //结果为一个对象
    console.log('body=', request.body);     //请求体

    // console.log(request);

    // 数据库处理
    // let sql = `SELECT * FROM user WHERE id = ${request.params.uid}`;
    let sql = `SELECT * FROM user`;
    let info = {};
    try {
        let prms = await query(sql);
        if (prms.length > 0) {
            info = {
                code: 2000,
                text: "操作执行成功",
                flag: true,
                params: prms
            }
            console.log(prms);
        }
        response.send(info);
    } catch (err) {
        info = {
            code: 3000,
            text: "失败",
            flag: false,
            params: prms
        }
        response.send(info)
    }
    // response.send(info)
})

// 修改用户数据 put

// 注册 post

// 登录 post

module.exports = Router;