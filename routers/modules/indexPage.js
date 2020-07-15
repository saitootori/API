/*
    首页数据
*/

// 引入
const express = require('express');
// 创建实例
const Router = express.Router();

// 引入封装的数据库
const query = require('../../databaseApi/MySQL/dbLink');

// 获取首页数据
Router.get('/index', async (request, response) => {
    console.log('<----------首页---------->');
    // 查看请求的参数
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