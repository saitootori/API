// 引入
let express = require('express');

// 引入主路由 本质是中间件
const AllRouter = require('./routers')

// 创建实例
let app = express();

// CORS跨越
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else {
        next();
    }
});

// 配置静态资源,官方的中间件
app.use(express.static('./'));
// 启用主路由
app.use(AllRouter);

// 监听端口
app.listen(2020, () => {
    console.log('ServerStart...,place visit post:http://localhost:2020');
})