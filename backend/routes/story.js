const express = require('express');
const router = express.Router();
const connection = require('../database');
const uuid = require('node-uuid');

router.get('/', (req, res) => {
    var sql = '';
    if (req.query.id) {
        sql = 'SELECT * FROM story WHERE publisher_id = \'' + req.query.id + '\'';
    } else {
        sql = 'SELECT * FROM story';
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

router.get('/comment', (req, res) => {
    if (req.query.id) {
        const sql = 'SELECT * FROM comment WHERE story_id = \'' + req.query.id + '\'';
        connection.query(sql, function (error, result) {
            if (error) {
                res.status(500);
                res.send();
            } else {
                res.send(result);
            }
        })
    } else {
        res.status(400);
        res.send('no story id');
    }
})

router.post('/', (req, res) => {
    if (req.query.post_id) {
        if (!req.body.commenter_id || !req.body.commenter_name || !req.body.story_id || !req.body.content) {
            res.status(500);
            res.send('incomplete data');
            return;
        }
        const addSql = "INSERT INTO comment(uuid, commenter_id, commenter_name, story_id, content) VALUES (?, ?, ?, ?, ?)";
        const addSqlParams = [uuid.v4(), req.body.commenter_id, req.body.commenter_name, req.body.story_id, req.body.content];
        connection.query(addSql, addSqlParams, function (error) {
            if (error) {
                res.status(400);
                res.send(error);
            } else {
                res.end();
            }
        })
    } else {
        if (!req.body.title || !req.body.content || !req.body.publisher || !req.body.publisher_id) {
            res.status(500);
            res.send('incomplete data');
            return;
        }
        const addSql = "INSERT INTO story(uuid, title, content, publisher, publisher_id) VALUES (?, ?, ?, ?, ?)";
        const addSqlParams = [uuid.v4(), req.body.title, req.body.content, req.body.publisher, req.body.publisher_id];
        connection.query(addSql, addSqlParams, function (error) {
            if (error) {
                res.status(400);
                res.send(error);
            } else {
                res.end();
            }
        })
    }
})

module.exports = router;