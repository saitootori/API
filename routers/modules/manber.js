/*
    后台管理界面API
        功能：
            验证员工用户名
            注册
            登录
            获取员工数据
            修改员工个人信息
*/

// 引入
const express = require('express');

// 创建实例
const Router = express.Router();

// 设置中间件   需要在子路由里单独设置
Router.use(express.urlencoded());
Router.use(express.json());
// Router.use(bodyParser.urlencoded({ extended: true }));

// 引入封装的数据库
const query = require('../../databaseApi/MySQL/dbLink');

let api;

// 注册前判断员工用户名     √
Router.get('/manberinfo/regcheck/:manber_user_name', async (req, res) => {
    api = '验证员工用户名接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('body=', req.body);

    // 数据库处理
    let sql = `SELECT * FROM manberinfo`;
    let info = {};
    try {
        let prms = await query(sql);//[{},{}]
        // console.log(prms);

        if (prms.length > 0) {
            // 判断
            // 用户名重复了返回false
            let result = true;
            prms.forEach(item => {
                if (req.params.manber_user_name) {
                    // console.log(req.params.manber_user_name, item.manber_user_name);
                    if (req.params.manber_user_name == item.manber_user_name) {
                        result = false
                    }
                } else if (req.query.manber_user_name) {
                    // console.log(req.params.manber_user_name, item.manber_user_name);
                    if (req.params.manber_user_name == item.manber_user_name) {
                        result = false
                    }
                } else {
                    result = true
                }
            })

            // console.log(result);
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

// 新增员工数据     √
Router.post('/manberinfo/reg', async (req, res) => {
    api = '员工注册接口'
    console.log(`<----------${api}---------->`);
    // console.log(req);
    console.log('params=', req.params);
    console.log('body=', req.body);
    console.log('query=', req.query);

    // 数据库处理

    // let sql = `INSERT INTO manberinfo (manber_id,manber_user_name,user_psw,user_token) VALUES (2,'czj1','123','123123');`;
    let sql = `INSERT INTO manberinfo (manber_id,manber_user_name,manber_user_psw,manber_name,manber_age,manber_phone,manber_address,manber_date)
                VALUES (${req.body.manber_id},'${req.body.manber_user_name}','${req.body.manber_user_psw}','${req.body.manber_name}','${req.body.manber_age}',
                '${req.body.manber_phone}','${req.body.manber_address}','${req.body.manber_date}');`;
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
        // console.log(err);
        info = {
            api,
            code: err.errno,
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 获取员工数据     √
Router.get('/manberinfo/personal/:manber_id', async (req, res) => {
    api = '个人信息接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('body=', req.body);

    let info = {};

    let uid;
    if (req.params.manber_id) {
        uid = req.params.manber_id
    } else if (req.body.manber_id) {
        uid = req.body.manber_id
    } else {

    }

    console.log(uid);

    // 数据库处理
    let sql = `SELECT * FROM manberinfo WHERE manber_id = ${uid}`;

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
            // console.log(prms);
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

// 所有员工数据     √
Router.get('/manberinfo/personal', async (req, res) => {
    api = '所有员工信息获取接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('body=', req.body);

    let info = {};

    let uid;
    if (req.params.manber_id) {
        uid = req.params.manber_id
    } else if (req.body.manber_id) {
        uid = req.body.manber_id
    } else {

    }

    // 数据库处理
    let sql = `SELECT * FROM manberinfo`;

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
            // console.log(prms);
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

// 修改员工数据 put     √       目前只能改员工名
Router.put('/manberinfo/personal', async (req, res) => {
    api = '修改信息接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('body=', req.body);
    // 数据库处理语句
    let sql = `UPDATE manberinfo SET manber_user_name = '${req.body.manber_user_name}' WHERE manber_id = ${req.body.manber_id} ; `;

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

// 删除员工
Router.delete('/manberinfo/personal', async (req, res) => {
    api = '删除个人信息接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('query=', req.query);
    console.log('body=', req.body);

    let info = {};

    let uid;
    if (req.params.manber_id) {
        uid = req.params.manber_id
    } else if (req.body.manber_id) {
        uid = req.body.manber_id
    } else if (req.query.manber_id) {
        uid = req.query.manber_id
    } else {

    }

    console.log(uid);

    // 数据库处理
    let sql = `DELETE FROM manberinfo WHERE manber_id= ${uid}`;

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
            // console.log(prms);
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



// 后台系统管理员部分
// 管理员登录 post    √
Router.post('/admininfo/login', async (req, res) => {
    api = '管理员登录接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('body=', req.body);

    // 数据库处理
    let sql = `SELECT * FROM admininfo WHERE admin_username = '${req.body.admin_username}'`;
    let info = {};
    let result = false;
    try {
        let prms = await query(sql);//[{},{}]
        // console.log(prms[0].user_name);
        // console.log(prms[0].user_psw);
        console.log(prms);

        // 判断数据库里有没有这个管理员
        if (prms.length) {
            // 有，判断密码
            console.log('管理员存在');
            if (req.body.admin_username == prms[0].admin_username && req.body.admin_psw == prms[0].admin_psw) {
                result = true;
            }
        }
        info = {
            api,
            code: 2000,
            msg: '数据库操作成功',
            sqlOk: true,
            result: result
        }
        res.send(info);
    } catch (err) {
        // console.log(err);
        info = {
            api,
            code: err.errno,
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 获取管理员数据   √
Router.get('/admininfo', async (req, res) => {
    api = '管理员注册验证接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('body=', req.body);

    // 数据库处理
    let sql = `SELECT * FROM admininfo`;
    let info = {};
    // let result = false;

    try {
        let prms = await query(sql);//[{},{}]
        // console.log(prms[0].user_name);
        // console.log(prms[0].user_psw);
        console.log(prms);

        info = {
            api,
            code: 2000,
            msg: '数据库操作成功',
            sqlOk: true,
            result: prms
        }
        res.send(info);


    } catch (err) {
        // console.log(err);
        info = {
            api,
            code: err.errno,
            msg: '操作失败：' + err.sqlMessage,
            flag: false
        }
        res.send(info)
    }
})

// 管理员注册       √
Router.post('/admininfo/reg', async (req, res) => {
    api = '管理员注册接口'
    console.log(`<----------${api}---------->`);
    console.log('params=', req.params);
    console.log('body=', req.body);

    // 数据库处理
    // let sql = `SELECT * FROM admininfo`;
    let sql = `INSERT INTO admininfo (
            admin_id,admin_username,admin_name,admin_psw)
    VALUES (${req.body.admin_id},'${req.body.admin_username}',
            '${req.body.admin_name}','${req.body.admin_psw}')`;
    let info = {};
    let result = false;

    try {
        if (req.body.admin_username !== '') {
            let prms = await query(sql);//[{},{}]
            // console.log(prms[0].user_name);
            // console.log(prms[0].user_psw);
            console.log(prms);

            info = {
                api,
                code: 2000,
                msg: '数据库操作成功',
                sqlOk: true,
                result: true
            }
            res.send(info);
        }

    } catch (err) {
        // console.log(err);
        info = {
            api,
            code: err.errno,
            msg: '操作失败：用户名为空或用户名重复了',
            flag: false
        }
        res.send(info)
    }
})

module.exports = Router;

