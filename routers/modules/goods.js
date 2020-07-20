/*
    商品API
        功能：
            增商品
            查商品(单个)
            查商品(所有)
*/

// 引入
const express = require('express');
// 创建实例
const Router = express.Router();

// 引入封装的数据库
const query = require('../../databaseApi/MySQL/dbLink');

// 设置中间件   需要在子路由里单独设置
Router.use(express.urlencoded());

let api;

// 添加商品信息
Router.post('/goodinfo', async (req, res) => {
    api = '添加商品接口'
    console.log(`<----------${api}---------->`);
    console.log('good_info', { ...req.body });

    // 数据库处理
    let sql = `INSERT INTO goodsinfo 
                    (good_id,
                    good_name,
                    good_size,
                    good_price,
                    good_img,
                    good_num,
                    good_stock,
                    good_discount) VALUES
                (${req.body.good_id},
                '${req.body.good_name}',
                '${req.body.good_size}',
                ${req.body.good_price},
                '${req.body.good_img}',
                ${req.body.good_num},
                ${req.body.good_stock},
                ${req.body.good_discount});`;
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

// 查询指定商品详情信息
Router.get('/goodinfo/:good_id', async (req, res) => {
    api = '查询单个商品接口'
    console.log(`<----------${api}---------->`);

    let info = {};

    let gid;
    if (req.params.good_id) {
        gid = req.params.good_id
    } else if (req.body.good_id) {
        gid = req.body.good_id
    } else {

    }

    // 数据库处理
    let sql = `SELECT * FROM goodsinfo WHERE good_id = ${gid}`;

    try {
        let prms = await query(sql);
        if (prms.length > 0) {
            info = {
                api,
                code: 2000,
                msg: "操作执行成功",
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
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 查询所有商品详情信息
Router.get('/goodinfo', async (req, res) => {
    api = '查询所有商品接口'
    console.log(`<----------${api}---------->`);

    let info = {};

    // 数据库处理
    let sql = `SELECT * FROM goodsinfo`;

    try {
        let prms = await query(sql);
        if (prms.length > 0) {
            info = {
                api,
                code: 2000,
                msg: "操作执行成功",
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
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})


module.exports = Router;