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
        var sql = 'SELECT * FROM user WHERE user_id = \'' + req.body.user_id + '\' AND user_password = \'' + req.body.user_password + '\'';
        connection.query(sql, function (error, result) {
            if (error) {
                res.status(500);
                res.send();
            } else if (result.length === 0) {
                res.status(404);
                res.send('user not exist');
            } else {
                res.end();
            }
        })
    }
})

module.exports = router;