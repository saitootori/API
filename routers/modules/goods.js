
// 引入
const express = require('express');
// 创建实例
const Router = express.Router();

// 引入封装的数据库
const query = require('../../databaseApi/MySQL/dbLink');

// 设置中间件   需要在子路由里单独设置
Router.use(express.urlencoded());

// 添加商品信息
Router.post('/goodinfo', async (req, res) => {
    console.log('<----------添加商品接口---------->');
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
            api: '添加商品接口',
            code: 2000,
            msg: '数据库操作成功',
            flag: true,
            result: result.protocol41
        }
        res.send(info);
    } catch (err) {
        console.log(err);
        info = {
            api: '添加商品接口',
            code: err.errno,
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 查询指定商品详情信息
Router.get('/uinfo/personal/:good_id', async (req, res) => {
    console.log('<----------查询单个商品接口---------->');

    let info = {};

    let uid;
    if (req.params.user_id) {
        uid = req.params.user_id
    } else if (req.body.user_id) {
        uid = req.body.user_id
    } else {

    }

    // 数据库处理
    let sql = `SELECT * FROM goodsinfo WHERE user_id = ${uid}`;

    try {
        let prms = await query(sql);
        if (prms.length > 0) {
            info = {
                api: '查询单个商品接口',
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
            api: '查询单个商品接口',
            code: err.errno,
            text: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

module.exports = Router;