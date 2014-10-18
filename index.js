var express = require('express')
	, app = express()
	, fs = require('fs')
	, eyes = require('eyes')
	, multer  = require('multer')
	, pg = require('pg')
	, sql = require('sql')
	, bodyParser = require('body-parser')
	, ejs = require('ejs')
	, $ = require('jquery')(require("jsdom").jsdom().parentWindow);
	// , google = require('googleapis'
	// , OAuth2 = google.auth.OAuth2;
;
var DATABASE_URL = 'postgres://rxczkdjyebmxfl:b8uvjvix4Z2yflVth3n1a4tOjv@ec2-54-246-81-118.eu-west-1.compute.amazonaws.com:5432/devrau91ujvtbo'
	+ '?ssl=true';

var currentArticle,
	currentArticleId;


var log = console.log.bind(console);

var interval = setInterval(function(){
	log('Alive');
})

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use( allowCrossDomain );

pg.connect(DATABASE_URL, function(err, client) {


	app.get('/touslesarticles', function(req, res) {
	    console.log('GET touslesarticles');
		var getArticles = client.query(
	       "SELECT * FROM articles",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
    		});
	})
	app.set('port', (process.env.PORT || 5000))
	.use(express.static(__dirname + '/public'))
	.use(multer({
		dest: './uploads/'
	}))
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use( bodyParser.urlencoded() );

	app.get('/upload', function(request, response) {
	    console.log('GET upload')
		response.render('upload.ejs');
	})
	app.get('/create', function(request, response) {
	    console.log('GET create')
		response.render('create.ejs');
	})
	.get('/folder/:folder', function(req, res) {
	    console.log('GET folder '+ req.params.folder);
	    console.log('https://googledrive.com/host/'+req.params.folder)
	    $.get('https://googledrive.com/host/'+req.params.folder,function(data,err){
	    	console.log(data,err);
	    });

	})
	.get('/bestof',function(req,res){
		var getBests = client.query(
	        "SELECT article_id, count(article_id) as popularity FROM profiles GROUP BY article_id ORDER BY popularity DESC",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
    		});
	})















	.get('/articles/:tag/:type', function(req, res) {
	    console.log('GET articles/'+req.params.tag+'/'+req.params.type)


	    var getArticles = client.query(
	       "SELECT * FROM articles WHERE tag='"+ req.params.tag +"' AND type='"+ req.params.type +"'",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
	    	});

	})
	.get('/articles/:tag', function(req, res) {
	    console.log('GET articles/'+req.params.tag)

	    var getArticles = client.query(
	       "SELECT * FROM articles WHERE tag='"+ req.params.tag +"' ",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
    		});
	})
	.get('/articles', function(req, res) {
	    console.log('GET articles')

	    var getArticles = client.query(
	       "SELECT * FROM articles",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
	    	});
	})
	// app.use(busboy({ immediate: true }));
	// // ...
	// app.use(function(req, res) {
	//   req.busboy.on('file', function(fieldname, file, filename) {
	//     console.log(fieldname,file,filename);
	//   });
	//   console.log('no file')
	// });

	app.post('/file-upload', function(req, res) {
	    // get the temporary location of the file
	    console.log('POST file-upload')

	    console.log(req.headers)
	    console.log(req.files)

	    var _id = req.headers._id;


	    var tmp_path = req.files.file.path;
	    // set where the file should actually exists - in this case it is in the "images" directory
	    var target_path = './public/images/uploads/'
	    	+ req.headers._id + '_'+ Date.now() + '.' + req.files.file.extension;
	    console.log(target_path)
	    // move the file from the temporary location to the intended location
	    fs.rename(tmp_path, target_path, function(err) {
	        if (err) throw err;
	        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
	        fs.unlink(tmp_path, function() {
	            if (err) throw err;
	            res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
	        });
	    });

		
		var update = client.query("INSERT INTO articles_medias VALUES (" + _id + ",'" + target_path + "')");





	});

	app.post('/new-article', function(req, res) {
	    // get the temporary location of the file
	    console.log('POST new-article')

	    console.log(req.body)

		   
		
		var update = client.query("INSERT INTO articles (titre,resume,tag,folder,files,type) VALUES ('"
			+ req.body.titre +"','"
			+ req.body.resume +"','"
			+ req.body.tag +"','"
			+ req.body.folder +"','"
			+ req.body.files +"','"
			+ req.body.type
			+ "')");

	})
	.post('/profile',function(req,res){
		console.log('POST profile');
		console.log(req.body)
		var deletion = client.query("DELETE FROM profiles WHERE user_id='"+ req.body.user_id +"'");

		var insertionString = "INSERT INTO profiles (article_id, user_id) VALUES ";
		for (var i = req.body.favoris.length - 1; i >= 0; i--) {
			insertionString += "(" + parseInt(req.body.favoris[i]) + "," + req.body.user_id + "),"
		};
		console.log(insertionString);
		var insertion = client.query(insertionString.slice(0,-1));
		res.json({status: 'OK'});
	})



	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'))
	})

});
