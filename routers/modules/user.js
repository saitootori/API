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

// 设置中间件   需要在子路由里单独设置
Router.use(express.urlencoded());

// 引入封装的数据库
const query = require('../../databaseApi/MySQL/dbLink');

let api;

// 注册前验证用户名
Router.get('/uinfo/regcheck/:user_name', async (req, res) => {
    api = '验证用户名接口'
    console.log(`<----------${api}---------->`);
    // console.log('url=', req.url);
    // console.log('path=', req.path);
    // console.log('method=', req.method);
    // console.log('params=', req.params); //结果为一个对象从地址栏获取
    // console.log('query=', req.query);   //结果为一个对象从body里获取
    // console.log('body=', req.body);


    // 数据库处理
    let sql = `SELECT * FROM userinfo`;
    let info = {};
    try {
        let prms = await query(sql);//[{},{}]
        // console.log(prms);

        if (prms.length > 0) {
            // 判断
            // 用户名重复了返回false
            let result = true;
            prms.forEach(item => {
                if (req.params.user_name) {
                    console.log(req.params.user_name, item.user_name);
                    if (req.params.user_name == item.user_name) {
                        result = false
                    }
                } else if (req.query.user_name) {
                    console.log(req.params.user_name, item.user_name);
                    if (req.params.user_name == item.user_name) {
                        result = false
                    }
                } else {
                    result = true
                }
            })

            console.log(result);
            info = {
                api,
                code: 2000,
                msg: '数据库操作成功',
                flag: true,
                result
            }
        }
        res.send(info);
    } catch (err) {
        console.log(err);
        info = {
            api,
            code: err.errno,
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 注册 post
Router.post('/uinfo/reg', async (req, res) => {
    api = '用户注册接口'
    console.log(`<----------${api}---------->`);
    // console.log(req);
    // console.log('user_info=', { ...req.body });

    // 数据库处理

    // let sql = `INSERT INTO userinfo (user_id,user_name,user_psw,user_token) VALUES (2,'czj1','123','123123');`;
    let sql = `INSERT INTO userinfo (user_id,user_name,user_psw,user_token) 
                VALUES (${req.body.user_id},'${req.body.user_name}','${req.body.user_psw}','${req.body.user_token}');`;
    let info = {};
    try {
        let result = await query(sql);//[{},{}]

        info = {
            api,
            code: 2000,
            msg: '数据库操作成功',
            flag: true,
            result: result.protocol41
        }
        res.send(info);
    } catch (err) {
        console.log(err);
        info = {
            api,
            code: err.errno,
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 登录 post
Router.post('/uinfo/login', async (req, res) => {
    api = '用户登录接口'
    console.log(`<----------${api}---------->`);
    // console.log(req);
    // console.log('user_name=', req.body.user_name);
    // console.log('user_psw=', req.body.user_psw);

    // 数据库处理
    let sql = `SELECT * FROM userinfo WHERE user_name = '${req.body.user_name}'`;
    let info = {};
    let result = false;
    try {
        let prms = await query(sql);//[{},{}]
        console.log(prms[0].user_name);
        console.log(prms[0].user_psw);

        // 判断数据库里有没有这个用户
        if (prms.length) {
            // 有，判断密码
            console.log('用户存在');
            if (req.body.user_name == prms[0].user_name && req.body.user_psw == prms[0].user_psw) {
                result = true;
            }
        }
        info = {
            api,
            code: 2000,
            msg: '数据库操作成功',
            sqlOk: true,
            result: '密码判定为:' + result
        }
        res.send(info);
    } catch (err) {
        console.log(err);
        info = {
            api,
            code: err.errno,
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

//  获取用户数据
Router.get('/uinfo/personal/:user_id', async (req, res) => {
    api = '个人信息接口'
    console.log(`<----------${api}---------->`);

    let info = {};

    let uid;
    if (req.params.user_id) {
        uid = req.params.user_id
    } else if (req.body.user_id) {
        uid = req.body.user_id
    } else {

    }

    // 数据库处理
    let sql = `SELECT * FROM userinfo WHERE user_id = ${uid}`;

    try {
        let prms = await query(sql);
        if (prms.length > 0) {
            info = {
                api,
                code: 2000,
                text: "操作执行成功",
                flag: true,
                result: prms
            }
            console.log(prms);
        }
        res.send(info);
    } catch (err) {
        info = {
            api,
            code: err.errno,
            text: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 修改用户数据 put
Router.put('/uinfo/personal', async (req, res) => {
    api = '修改信息接口'
    console.log(`<----------${api}---------->`);
    // 数据库处理语句
    let sql = `UPDATE userinfo SET user_name = '${req.body.user_name}' WHERE user_id = ${req.body.user_id} ; `;

    try {
        let prms = await query(sql);
        let info = {};
        if (prms) {
            info = {
                api,
                code: 2000,
                text: "操作执行成功",
                flag: true,
                result: prms.protocol41
            }
            res.send(info);
        }
    } catch (err) {
        info = {
            api,
            code: err.errno,
            text: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

module.exports = Router;