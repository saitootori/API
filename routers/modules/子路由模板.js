// 引入express
const express = require('express');
// 创建(子)路由
const Router = express.Router();

// 设置中间件   需要在子路由里单独设置  作用：将请求体的数据放入req.body里
Router.use(express.urlencoded());

// 引入封装的数据库
const query = require('../../databaseApi/MySQL/dbLink');

// 提示接口名字的参数
let api;

//      ↓get、post、put、delete
Router.get('/路径', async (req, res) => {
    //       ↑还可以'/路径/:id'
    // 设置接口名
    api = '验证用户名接口'
    // 提示接口名
    console.log(`<----------${api}---------->`);
    console.log('url=', req.url);
    console.log('path=', req.path);
    console.log('method=', req.method);
    console.log('params=', req.params); //结果为一个对象从地址栏获取
    console.log('body=', req.body);

    // 数据库处理
    let sql = `sql语句`;
    // 返回前端的信息
    let info = {};
    // 尝试连接数据库
    try {
        // 接收sql语句执行结果
        let prms = await query(sql);//数据格式[{},{}]
        // 数据处理(判断..)

        if (条件) {
            // 将成功信息写进info
            info = {
                api,                        //接口名
                code: 2000,                 //状态码
                msg: '数据库操作成功',       //成功信息
                flag: true,
                result: prms                 //(对象信息/true/false)
            }
        }
        // 将数据发给前端，断开数据库连接
        res.send(info);

    } catch (err) {
        // 捕获错误信息
        console.log(err);
        // 将错误信息写进info
        info = {
            api,                                //接口名
            code: err.errno,                    //状态码
            msg: '操作失败：' + err.sqlMessage,  //失败信息
            flag: false
        }
        // 将数据发给前端，断开数据库连接
        res.send(info)
    }
})
