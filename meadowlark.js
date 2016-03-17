var express = require('express');
var app = express();

//访问外部数组
var fortune = require('./lib/fortune.js');

/*
//访问内部数组
var fortunes = [
	"Conquer your fear or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
]
*/

//handlebars代码
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(function(req, res, next){
	  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	//res.locals.showTests = true;
	next();
});

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res){
	/*
	res.type('text/plain');
	res.send('Meadowlark Travel');
	*/
	res.render('home');
});


//普通模式
//app.get('/about', function(req, res){
	
	/*
	res.type('text/plain');
	res.send('About Meadowlark Travel');
	*/
//	res.render('about');
//});

//随机模式
app.get('/about', function(req, res){
	/*
	//访问内部数组
	var randomFortune = fortunes[Math.floor(Math.random()* fortunes.length)];
	res.render('about', {fortune: randomFortune});
	*/
	//访问外部数组
	//res.render('about', {fortune: fortune.getFortune()});
	
    //访问外部数组 - QA测试
	res.render('about', {fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js'});
});


app.use(function(req, res){
	/*
	res.type('text/plain');
	res.status(400);
	res.send('404 - Not Found');
	*/
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	/*
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
	*/
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + ';pressCtrl-C to terminate.');
	
});
