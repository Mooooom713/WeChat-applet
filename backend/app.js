const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wechatapplet'
})
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connection.connect(function (error) {
    if (error) {
        console.log(error);
    }
})

app.post('/login', (req, res) => {
    const idLength = req.body.user_id ? req.body.user_id.length : 0;
    const passLength = req.body.user_password ? req.body.user_password.length : 0;
    const reg = /^\d{13}$/;
    if (!reg.test(req.body.user_id) || idLength !== 13 || passLength < 6 || passLength > 16) {
        res.status(400);
        res.send("invalid data");
    } else {
        var sql = 'SELECT * FROM user WHERE user_id = \'' + req.body.user_id + '\'';
        connection.query(sql, function (error, result) {
            if (error) {
                res.status(500);
                res.send();
            } else if (result.length === 0) {
                res.status(404);
                res.send();
            } else {
                res.end();
            }
        })
    }
})

app.post('/newUser', function (req, res) {
    const idLength = req.body.user_id ? req.body.user_id.length : 0;
    const passLength = req.body.user_password ? req.body.user_password.length : 0;
    const reg = /^\d{13}$/;
    if (!reg.test(req.body.user_id) || idLength !== 13 || passLength < 6 || passLength > 16) {
        res.status(400);
        res.send("invalid data");
    } else {
        var addSql = 'INSERT INTO user(user_id, user_password) VALUES (?, ?)';
        var addSqlParams = [req.body.user_id, req.body.user_password];
        connection.query(addSql, addSqlParams, function (error, result) {
            if (error && error.code === 'ER_DUP_ENTRY') {
                res.status(400);
                res.send(error.sqlMessage);
            } else {
                res.end();
            }
        })
    }
})

app.listen(3000, () => {
    console.log("start successfully");
});