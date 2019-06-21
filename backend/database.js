const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // 改成自己的密码
    database: 'wechatapplet'
})
connection.connect(function (error) {
    if (error) {
        console.log(error);
    }
})

module.exports = connection;