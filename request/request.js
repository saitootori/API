// 爬虫
// 发送请求
const request = require('request');
// 使用jq的节点操作
const cheerio = require('cheerio');
const fs = require('fs');


// request('https://www.baidu.com', function (error, response, body) {
//     console.log(body)//打印百度首页html内容
// })

let url = 'https://www.taobao.com/';

// https://s.taobao.com/search?spm=a21bo.2017.201867-main.27.52c911d9qC6IiO&q=%E9%9B%B6%E9%A3%9F&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&ie=utf8&initiative_id=tbindexz_20170306
// https://acs.m.taobao.com/h5/mtop.taobao.baichuan.smb.get/1.0/?jsv=2.3.16&appKey=12574478&t=1594971849852&sign=03d3e2d2b8ef15c8466a5ebd2b064496&api=mtop.taobao.baichuan.smb.get&v=1.0&type=originaljson&dataType=jsonp&timeout=10000
// http://www.meiliwan.com/mobile/goods.php?id=458
// https://www.mi.com/?client_id=180100041080&masid=2110.0001&gsadid=gad_472_jnrx4c1y&utm_Account=Default&utm_Adgroup=%e5%b0%8f%e7%b1%b3&utm_Campaign=2020%e5%b9%b4%e5%85%a8%e5%b9%b4%e7%99%be%e5%ba%a6%e6%8a%95%e6%94%be%e9%a1%b9%e7%9b%ae&utm_Medium=Display&utm_Channel=%e7%99%be%e5%ba%a6PC&utm_Source=%e7%99%be%e5%ba%a6%e5%93%81%e4%b8%93&utm_Term=%e7%99%be%e5%ba%a6PC
// request('http://www.meiliwan.com/', (err, res, body) => {
request(url, (err, res, body) => {

    // 爬取数据                         ↓中文乱码处理
    let $ = cheerio.load(body, { decodeEntities: false });
    // console.log(body);

    // let arr = [];

    // 遍历节点获取子节点的属性
    $('body').each((idx, ele) => {
        console.log(ele.children[0].children[0]);
        //     let con = {};
        //     // 添加属性
        //     con.good_id = idx;
        //     con.good_img = $(ele).find('img').attr('src');
        //     // con.good_title = $(ele).find('.goods_name').html();
        //     // con.good_price = $(ele).find('.price_pro').html();
        //     // 将对象放入数组
        //      arr.push(con);
        // arr.push(ele);
    });

    // console.log(arr);

    // writeData();
})

function writeData() {
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
}