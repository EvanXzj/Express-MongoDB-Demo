var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var demoSchema=new Schema({
	uid:String,
	title:String,
	content:String,
	createTime:{
		type:Date,
		deafult:Date.now
	}
});

exports.Demo = mongoose.model('demo', demoSchema, 'demo');