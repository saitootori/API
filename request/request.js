// 爬虫
// 发送请求
const request = require('request');
// 使用jq的节点操作
const cheerio = require('cheerio');
const fs = require('fs');


// request('https://www.baidu.com', function (error, response, body) {
//     console.log(body)//打印百度首页html内容
// })

// http://www.meiliwan.com/mobile/goods.php?id=458
// http://www.meiliwan.com/mobile/goods.php?act=price&id=458&attr=&number=1&1594813110750750
request('http://www.meiliwan.com/', (err, res, body) => {


    let $ = cheerio.load(body, { decodeEntities: false });
    // console.log(body);
    let arr = [];

    // 遍历节点获取子节点的属性
    $('#scroll_best li').each((idx, ele) => {
        let con = {};
        // 添加属性
        con.good_id = idx;
        con.good_img = $(ele).find('.products_kuang img').attr('src');
        con.good_title = $(ele).find('.goods_name').html();
        con.good_price = $(ele).find('.price_pro').html();
        // 将对象放入数组
        arr.push(con);
    });

    console.log(arr);

    // 写进json文件
    let writeStream = fs.createWriteStream('./data.json');
    // 转成字符串
    let str = JSON.stringify(arr);
    // 写入文档     重复执行会自动覆盖
    writeStream.write(str);
    writeStream.end();
    writeStream.on('finish', () => {
        console.log('写入完成');
    })
})