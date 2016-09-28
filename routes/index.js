var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
var model=require('../models/model');

//console.log(model);
var Demo=model.Demo;
//console.log(Demo);
mongoose.connect('mongodb://localhost/express_demo');//连接数据库

/* GET home page. */
router.get('/', function(req, res, next) {
 	var id=Demo.find(function(err,demos){
 		console.log(demos);
 		if(err) throw err;
 		res.render('index',{
 			title:'Express+MongoDb示例',
 			demos:demos
 		});
 	});
 	console.log(id);
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: '添加一条数据'});
});

router.post('/add', function(req, res, next) {
     var demo = new Demo({
        uid: req.body.uid,
        title: req.body.title,
        content: req.body.content
    });

    console.log('======================create========================');

    demo.save(function(err, doc) {
        console.log(doc);
        res.redirect('/');
    });
});

router.get('/update/:id', function(req, res, next) {
    var id=req.params.id.substring(1);
    console.log(id);
    if (id && id != '') {
        Demo.findById(id, function(err, docs) {
            console.log('========================findById(\"' + id + '\")=======================\n' + docs);
            res.render('update', {
                title: '修改数据',
                demos: docs
            });
        });
    }
});

router.get('/del/:id', function(req, res, next) {
    var id = req.params.id.substring(1);

    if (id && id != '') {
        console.log('=====================delete id = ' + id);
        Demo.findByIdAndRemove(id, function(err, docs) {
            console.log(docs);
            res.redirect('/');
        });
    }
});

router.post('/update/:id', function(req, res, next) {
    var demo = {
        uid: req.body.uid,
        title: req.body.title,
        content: req.body.content
    };

    var id = req.params.id.substring(1);
    console.log('id:'+id);
     console.log('id:'+id);

    if (id && id != '') {
        console.log('=======================update id = ' + id);
        Demo.findByIdAndUpdate(id, demo, function(err, docs) {
            console.log('docs:'+docs);

            console.log(docs);
            res.redirect('/');
        });
    }
});

module.exports = router;
