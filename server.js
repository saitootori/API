// 引入
let express = require('express');

// 引入主路由 本质是中间件
const AllRouter = require('./routers')

// 创建实例
let app = express();

// 配置静态资源,官方的中间件
app.use(express.static('./public'));
// 启用主路由
app.use(AllRouter);

// 监听端口
app.listen(2020, () => {
    console.log('ServerStart...,place visit post:http://localhost:2020');
})