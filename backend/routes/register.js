const express = require('express');
const router = express.Router();
const connection = require('../database');

router.post('/', (req, res) => {
    const idLength = req.body.user_id ? req.body.user_id.length : 0;
    const passLength = req.body.user_password ? req.body.user_password.length : 0;
    const reg = /^\d{13}$/;
    if (!reg.test(req.body.user_id) || idLength !== 13 || passLength < 6 || passLength > 16 || !req.body.name || !req.body.gender || !req.body.age || !req.body.grade || !req.body.department || !req.body.major) {
        res.status(400);
        res.send('invalid data');
    } else {
        const addSql = 'INSERT INTO user(user_id, user_password, name, gender, age, grade, department, major, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const addSqlParams = [req.body.user_id, req.body.user_password, req.body.name, req.body.gender, req.body.age, req.body.grade, req.body.department, req.body.major, 'student'];
        connection.query(addSql, addSqlParams, function (error) {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(400);
                    res.send('user exists');
                } else {
                    res.status(400);
                    res.send(error.sqlMessage);
                }
            }
            res.end();
        })
    }
})

module.exports = router;