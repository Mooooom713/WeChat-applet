const express = require('express');
const router = express.Router();
const connection = require('../database');

router.post('/', (req, res) => {
    const idLength = req.body.user_id ? req.body.user_id.length : 0;
    const passLength = req.body.user_password ? req.body.user_password.length : 0;
    const reg = /^\d{13}$/;
    if (!reg.test(req.body.user_id) || idLength !== 13 || passLength < 6 || passLength > 16) {
        res.status(400);
        res.send('invalid data');
    } else {
        const addSql = 'INSERT INTO user(user_id, user_password) VALUES (?, ?)';
        const addSqlParams = [req.body.user_id, req.body.user_password];
        connection.query(addSql, addSqlParams, function (error) {
            if (error && error.code === 'ER_DUP_ENTRY') {
                res.status(400);
                res.send('user exists');
            } else {
                res.end();
            }
        })
    }
})

module.exports = router;