const express = require('express');
const router = express.Router();

module.exports = (app) => {
    /************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
    const { collections: { users } } = app;
    // 创建账号接口
    router.post('/api/login/createAccount',(req,res) => {
        // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
        const newAccount = {
            account : req.body.account,
            password : req.body.password
        };
        //插入数据
        users.insertOne(newAccount, function(err, result) { 
            if(err){
                console.log('Error:'+ err);
                return;
            } else {
                console.log('result:'+ result);
                res.send(result);
            }
        });
    });
    // 获取已有账号接口
    router.post('/api/login/getAccount',(req,res) => {
        const queryAccount = {
            account : req.body.account,
            password : req.body.password
        };
        // 通过模型去查找数据库
        users.find(queryAccount).toArray((err, docs) => {
            if (err) {
                console.log('Error:'+ err);
            } else {
                console.log('docs:'+ docs);
                const data = {
                    docs,
                    state: 200
                }
                res.send(data)
            }
        })
    });
    return router
};