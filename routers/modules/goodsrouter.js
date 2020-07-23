const express = require('express');
//引入mysql方法，做数据库的查询
const query = require("../../databaseApi/MySQL/dbLink");
const router = express.Router();//router==app

// * 商品管理 goodsRouter.js
//             * 商品信息列表
//             * 查询gid为xx的商品
//             * 修改gid为xx的商品信息
//             * 删除gid的商品
//             * 删除多个商品
//             * 新增商品
//             * 
//     * 三个表
//         * 商品信息表：存商品信息 包含商铺信息;爬虫准备的数据
//         * 用户信息表：注册
//         * 订单表:加入购物车

//用id查询商品信息11
router.get("/goodlist/:id", async (req, res) => {
    let id = req.params.id
    try {
        let sql = `SELECT * FROM goodinfo WHERE iGoodsId=${id}`;
        let p = await query(sql);//[{},{}]

        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 200,
                flag: true,
                message: '查询成功',
                //data: {
                data: p[0]
                //}
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 300,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//删除指定goodsid的数据11
router.delete("/delgoods", async (req, res) => {
    let { iGoodsId, uid } = req.body
    console.log(uid)
    console.log(req.body)
    try {
        let sql = `DELETE FROM cart WHERE iGoodsId=${iGoodsId} and user_id=${uid}`
        let p = await query(sql)
        let inf = {}
        if (p.affectedRows) {
            inf = {
                code: 200,
                flag: true,
                message: "删除成功"
            }
        } else {
            inf = {
                code: 300,
                flag: false,
                message: "删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//删除多个商品
router.delete("/goodsdelall/", async (req, res) => {
    let idstr = req.body.ids
    try {
        let sql = `DELETE FROM goods WHERE goodsid in(${idstr})`
        let p = await query(sql)
        let inf = {}
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: "删除成功"
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf)
    }
})
//修改商品信息 111
router.put("/changegoods", async (req, res) => {
    let { iTotal, iGoodsId, uid } = req.body
    console.log(req.body)
    console.log(iTotal)
    console.log("iGoodsId", iGoodsId)
    try {
        let sql = `UPDATE cart SET iTotal=${iTotal} WHERE iGoodsId=${iGoodsId} and user_id=${uid}`

        let p = await query(sql)
        console.log(p)
        let inf = {}
        if (p.affectedRows) {
            inf = {
                code: 200,
                flag: true,
                message: '修改成功'
            }
        } else {
            inf = {
                code: 300,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            flag: false,
            code: err.errno,
            message: "查询失败或超时"
        }
        res.send(inf)
    }
})
// 新增商品11
router.post("/addgoods", async (req, res) => {
    let { iGoodsId, iTotal, iCurrPrice, sMallName, sProfileImg, uid, iCheck } = req.body;
    console.log(req.body)

    console.log(sProfileImg)

    try {
        let sql = `INSERT INTO cart (Id,iGoodsId,iTotal,iCurrPrice,sMallName,sProfileImg,user_id,iCheck) VALUES(null,'${iGoodsId}','${iTotal}','${iCurrPrice}','${sMallName}','${sProfileImg}','${uid}','${iCheck}');`;
        console.log(sql)
        let p = await query(sql);
        let inf = {}
        // console.log(p)
        if (p.affectedRows) {
            inf = {
                code: 200,
                flag: true,
                message: "新增成功"
            }
        } else {
            inf = {
                code: 300,
                flag: false,
                message: "新增失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//查询用户的购物车11
router.get("/cart/:id", async (req, res) => {
    let id = req.params.id
    console.log(id)
    try {
        let sql = `SELECT * FROM cart WHERE user_id=${id}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 200,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 300,
                flag: false,
                message: '查询失败或超时'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//查询全部商品 11
router.get("/getgood", async (req, res) => {
    try {
        let sql = `SELECT * FROM goodinfo`;
        let p = await query(sql);
        let inf = {}
        // console.log(p)
        if (p.length) {
            inf = {
                code: 200,
                flag: true,
                message: "新增成功",
                data: {
                    p
                }
            }
        } else {
            inf = {
                code: 300,
                flag: false,
                message: "新增失败"
            }
        }
        console.log(p)
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//查询推荐商品 11
router.get("/gethotgoods", async (req, res) => {
    try {
        let sql = `SELECT * FROM goodinfo ORDER BY RAND() limit 3`;
        console.log(sql.length)
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 200,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 300,
                flag: false,
                message: '查询成功'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//查询购物车推荐商品 11
router.get("/roundcart", async (req, res) => {
    try {
        let sql = `SELECT * FROM goodinfo ORDER BY RAND() limit 9`;
        console.log(sql.length)
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 200,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 300,
                flag: false,
                message: '查询成功'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
module.exports = router;