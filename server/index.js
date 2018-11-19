const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var DB_URL = 'mongodb://localhost:27017';

(async function f() {
    const app = express();
    // 链接数据库
    try {
        const client = await MongoClient.connect(DB_URL, { useNewUrlParser: true });
        console.log('mongodb connected...');
        const db = client.db('app');
        app.db = db;
        app.collections = {
          users: db.collection('user'),
        };
      } catch (e) {
        console.log('mongodb connect failed.');
        console.warn(e);
      }
    //await db completed
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(api(app));

    // 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
    app.use(express.static(path.resolve(__dirname, '../dist')))
    // 因为是单页应用 所有请求都走/dist/index.html
    app.get('*', function(req, res) {
        const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
        res.send(html)
    })
    // 监听8088端口
    app.listen(8088);
    console.log('success listen…………');

})();