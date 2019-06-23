const express = require('express');
const router = express.Router();
const connection = require('../database');
const uuid = require('node-uuid');

router.get('/', (req, res) => {
    var sql = '';
    if (req.query.id) {
        sql = 'SELECT * FROM getup WHERE initiator = \'' + req.query.id + '\'';
    } else {
        sql = 'SELECT * FROM getup';
    }
    connection.query(sql, function (error, result) {
        if (error) {
            res.status(500);
            res.send();
        } else {
            res.send(result);
        }
    })
})

router.post('/', (req, res) => {
    if (!req.body.startDate || !req.body.duration || !req.body.time || !req.body.initiator || !req.body.initiator_name) {
        res.status(500);
        res.send('incomplete data');
        return;
    }
    const addSql = "INSERT INTO getup(uuid, startDate, duration, time, remark, telephone, initiator, participants_number, initiator_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const addSqlParams = [uuid.v4(), req.body.startDate, req.body.duration, req.body.time, req.body.remark || null, req.body.telephone || null, req.body.initiator, 1, req.body.initiator_name];
    connection.query(addSql, addSqlParams, function (error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.end();
        }
    })
})

router.post('/join', (req, res) => {
    if (!req.body.uuid) {
        res.status(500);
        res.send('uuid is required');
        return;
    }
    const sql = "UPDATE getup SET participants_number = participants_number + '1' WHERE uuid = \'" + req.body.uuid + '\'';
    connection.query(sql, function (error) {
        if (error) {
            res.status(500);
            res.send(error.sqlMessage);
        } else {
            res.end();
        }
    })
})

module.exports = router;