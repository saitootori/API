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

// 注册前验证用户名     user_name
Router.get('/uinfo/reg/:user_name', async (req, res) => {
    console.log('<----------验证用户名---------->');
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
                code: 2000,
                api: '用户注册接口',
                msg: '数据库操作成功',
                sqlOk: true,
                regOrNot: result
            }
        }
        res.send(info);
    } catch (err) {
        console.log(err);
        info = {
            code: err.errno,
            msg: err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})


// 注册 post




// 登录 post
Router.post('/uinfo/login', async (req, res) => {
    console.log('<----------用户登录---------->');
    console.log(req);
    console.log('user_name=', req.body.user_name);
    console.log('user_psw=', req.body.user_psw);

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
            code: 2000,
            api: '用户登录接口',
            msg: '数据库操作成功',
            sqlOk: true,
            regOrNot: result
        }
        res.send(info);
    } catch (err) {
        console.log(err);
        info = {
            code: err.errno,
            msg: '连接失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})







//  获取用户数据    动态路由
Router.get('/uinfo/:uid', async (req, res) => {
    console.log('<----------个人页---------->');
    console.log('url=', req.url);       //请求地址
    console.log('path=', req.path);     //请求地址
    console.log('method=', req.method); //请求方式
    console.log('params=', req.params); //结果为一个对象
    console.log('query=', req.query);   //结果为一个对象
    console.log('body=', req.body);     //请求体

    // console.log(req);

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
        res.send(info);
    } catch (err) {
        info = {
            code: 3000,
            text: "失败",
            flag: false,
            params: prms
        }
        res.send(info)
    }
    // res.send(info)
})

// 修改用户数据 put



module.exports = Router;