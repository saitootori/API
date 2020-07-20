// 除非换数据库，否则别动这个文件

// 引入数据库模块
const mysql = require('mysql');

//数据库连接池(配置信息)
const conn = mysql.createPool({
    host: 'localhost',          //服务器地址
    user: 'root',               //账号
    password: 'root',           //密码
    port: 3306,                 //mysql默认端口
    database: 'mlwdb',       //数据库名字
    multipleStatements: true    //允许同时执行多条sql语句
});

// 封装数据库处理方法导出给子路由调用
function query(sql) {
    return new Promise((res, rej) => {
        conn.query(sql, (err, data) => {
            console.log("连接数据库");
            if (err) rej(err)
            res(data);
        });
    });
};

module.exports = query;

// 调用格式
// sql = 'SELECT * FROM shopcarinfo'
// let prms = query(sql).then(res => {
//     console.log(res);
//     return res
// }).catch(err => {
//     console.log(err);
//     return err
// });
// console.log(prms);



// 查询数据库
// let sql = '';

// sql = 'SELECT * FROM shopcarinfo'
// conn.query(sql, (err, data) => {
//     console.log("连接数据库");

//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("data=", data);
// });
