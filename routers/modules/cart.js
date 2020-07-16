
// 引入
const express = require('express');
// 创建实例
const Router = express.Router();

// 引入封装的数据库
const query = require('../../databaseApi/MySQL/dbLink');

// 按用户查询购物车信息
Router.get('/cartinfo/:uid', async (request, response) => {
    console.log('<----------购物车---------->');
    console.log('url=', request.url);
    console.log('path=', request.path);
    console.log('method=', request.method);
    console.log('params=', request.params); //结果为一个对象
    console.log('query=', request.query);   //结果为一个对象
    console.log('body=', request.body);

    // 获取地址栏或者请求体内的用户id
    let uid;
    if (request.params.uid) {
        uid = request.params.uid
    } else {
        uid = request.query.uid
    }

    // 数据库处理
    let sql = `SELECT * FROM cartinfo WHERE user_id = ${uid}`;
    let info = {};
    try {
        // 接收数据
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

module.exports = Router;