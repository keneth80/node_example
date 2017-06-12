var fs = require('fs');
var http = require('http');
var mysql = require('mysql');
var ejs = require('ejs'); // template engine
var bodyParser = require('body-parser'); // post 요청할때 데이터를 쉽게 추출하도록 해주는 미들웨어, request 객체에 body속성이 부여
var connection = require('./../connection');

var express = require('express');
var router = express.Router();

var app = express();

http.createServer(app).listen(8000, function () {
    console.log('Server running at http://127.0.0.1:8000');
});

 /* GET all members listing. */
app.get('/', function (req, res) {
    fs.readFile('db.mysql/member/list.html', 'utf8', function (error, data) {
        if (error) {
            console.log('readFile Error', error.message);
        } else {
            connection.query('select * from members', function (error, results) {
                if (error) {
                    console.log('error : ', error.message);
                } else {
                    res.send(ejs.render(data, {
                        memberList: results
                    }));
                }
            });
        }
    })
});

/* DELETE members listing. */
app.get('/delete/:uid', function (req, res) {
    connection.query('delete from members where uid = ?', [req.params.uid],
        function (error, result) {
            if (error) {
                console.log('delete Error');
            } else {
                console.log('delete uid = %d', req.params.uid);
                res.redirect('/');
            }
        });
});

/* list file read */
app.get('/insert', function (req, res) {
    fs.readFile('db.mysql/member/insert.html', 'utf8', function (error, data) {
        if (error) {
            console.log('readFile Error');
        } else {
            res.send(data);
        }
    })
});

 /* GET member listing. */
app.get('/edit/:uid', function (req, res) {
    fs.readFile('db.mysql/member/edit.html', 'utf8', function (error, data) {
        connection.query('select * from members where uid = ?', [req.params.uid],
            function (error, result) {
                if (error) {
                    console.log('readFile Error');
                } else {
                    res.send(ejs.render(data, {
                        member: result[0]
                    }));
                }
            });
    });
});

// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

/* POST members listing. */
app.post('/insert', function (req, res) {
    var body = req.body;

    connection.query('insert into members(uid, m_id, m_name, m_birth, m_sex, m_mobile, m_email, m_address, m_del_yn) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [body.uid, body.m_id, body.m_name, body.m_birth, body.sex, body.m_mobile, body.m_email, body.m_address, body.m_del_yn],
        function (error, result) {
            if (error) {
                console.log('insert error : ', error.message);
            } else {
                res.redirect('/');
            }
        });
});

/* POST members listing. */
app.post('/edit/:uid', function (req, res) {
    var body = req.body;

    connection.query('update members set m_id=?, m_name=?, m_birth=?, sex=?, m_mobile=?, m_email=?, m_address=?, m_del_yn=? where uid=?',
        [body.m_id, body.m_name, body.m_birth, body.sex, body.m_mobile, body.m_email, body.m_address, body.m_del_yn, body.uid],
        function (error, result) {
            if (error) {
                console.log('update error : ', error.message);
            } else {
                res.redirect('/');
            }
        });
});
