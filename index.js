var express = require('express')
	, app = express()
	, fs = require('fs')
	, eyes = require('eyes')
	, multer  = require('multer')
	, pg = require('pg')
	, sql = require('sql')
	, bodyParser = require('body-parser')
	, ejs = require('ejs')
	// , $ = require('jquery')(require("jsdom").jsdom().parentWindow);
	// , google = require('googleapis'
	// , OAuth2 = google.auth.OAuth2;
;
var DATABASE_URL = 'postgres://itnrhvtzozcmgq:eDJpEXjGz1kE8IVnqhZG6doX-i@ec2-107-20-197-146.compute-1.amazonaws.com:5432/d5qovjgfdllb6p'
	+ '?ssl=true';

var currentArticle,
	currentArticleId;


var log = console.log.bind(console),
	genre = 0;

var interval = setInterval(function(){
	genre++;
	console.log("Alive, "  + (genre%2 ? "boy": "girl"));
}, 2000)

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use( allowCrossDomain );

pg.connect(process.env.DATABASE_URL, function(err, client) {


	app.set('port', (process.env.PORT || 5000))
	.use(express.static(__dirname + '/public'))
	.use(multer({
		dest: './uploads/'
	}));
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use( bodyParser.urlencoded() )

	.get('/touslesarticles', function(req, res) {
	    console.log('GET touslesarticles');
		var getArticles = client.query(
	       "SELECT * FROM articles",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
    		});
	})
	.get('/touteslesassos', function(req, res) {
	    console.log('GET touteslesassos');
		var getAssos = client.query(
	       "SELECT * FROM associations",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
    		});
	})

// 	app.get('/upload', function(request, response) {
// 	    console.log('GET upload')
// 		response.render('upload.ejs');
// 	})
// 	app.get('/create', function(request, response) {
// 	    console.log('GET create')
// 		response.render('create.ejs');
// 	})
// 	.get('/folder/:folder', function(req, res) {
// 	    console.log('GET folder '+ req.params.folder);
// 	    console.log('https://googledrive.com/host/'+req.params.folder)
// 	    $.get('https://googledrive.com/host/'+req.params.folder,function(data,err){
// 	    	console.log(data,err);
// 	    });

// 	})
	.get('/bestof',function(req,res){
		var getBests = client.query(
	        "SELECT article_id, count(article_id) as popularity FROM profiles GROUP BY article_id ORDER BY popularity DESC",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
    		});
	});















// 	.get('/articles/:tag/:type', function(req, res) {
// 	    console.log('GET articles/'+req.params.tag+'/'+req.params.type)


// 	    var getArticles = client.query(
// 	       "SELECT * FROM articles WHERE tag='"+ req.params.tag +"' AND type='"+ req.params.type +"'",
// 	    	function(err,result){
// 	    		console.log(result.rows)
// 	    		res.json(result.rows)
// 	    	});

// 	})
// 	.get('/articles/:tag', function(req, res) {
// 	    console.log('GET articles/'+req.params.tag)

// 	    var getArticles = client.query(
// 	       "SELECT * FROM articles WHERE tag='"+ req.params.tag +"' ",
// 	    	function(err,result){
// 	    		console.log(result.rows)
// 	    		res.json(result.rows)
//     		});
// 	})
// 	.get('/articles', function(req, res) {
// 	    console.log('GET articles')

// 	    var getArticles = client.query(
// 	       "SELECT * FROM articles",
// 	    	function(err,result){
// 	    		console.log(result.rows)
// 	    		res.json(result.rows)
// 	    	});
// 	})
// 	// app.use(busboy({ immediate: true }));
// 	// // ...
// 	// app.use(function(req, res) {
// 	//   req.busboy.on('file', function(fieldname, file, filename) {
// 	//     console.log(fieldname,file,filename);
// 	//   });
// 	//   console.log('no file')
// 	// });

// 	app.post('/file-upload', function(req, res) {
// 	    // get the temporary location of the file
// 	    console.log('POST file-upload')

// 	    console.log(req.headers)
// 	    console.log(req.files)

// 	    var _id = req.headers._id;


// 	    var tmp_path = req.files.file.path;
// 	    // set where the file should actually exists - in this case it is in the "images" directory
// 	    var target_path = './public/images/uploads/'
// 	    	+ req.headers._id + '_'+ Date.now() + '.' + req.files.file.extension;
// 	    console.log(target_path)
// 	    // move the file from the temporary location to the intended location
// 	    fs.rename(tmp_path, target_path, function(err) {
// 	        if (err) throw err;
// 	        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
// 	        fs.unlink(tmp_path, function() {
// 	            if (err) throw err;
// 	            res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
// 	        });
// 	    });

		
// 		var update = client.query("INSERT INTO articles_medias VALUES (" + _id + ",'" + target_path + "')");





// 	});
	app.post('/profile',function(req,res){
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
	});

	app.post('/contenus/article', function(req, res) {
	    // get the temporary location of the file
	    console.log('POST article')

	    console.log(req.body)

		var update = client.query("INSERT INTO articles (titre,resume,tag,folder,files,iframe,date,type) VALUES ('"
			+ req.body.titre +"','"
			+ req.body.resume +"','"
			+ req.body.tag +"','"
			+ req.body.folder +"','"
			+ req.body.files +"',"			
			+ req.body.iframe +"',"
			+ req.body.date +",'"
			+ req.body.type
			+ "')");

	})
	.put('/contenus/article/:id', function(req, res) {

	    console.log('PUT article')

	    console.log(req.body,req.params.id)

		var update = client.query("UPDATE articles SET "
			+ "titre='" + req.body.titre +"',"
			+ "resume='" + req.body.resume +"',"
			+ "tag='" + req.body.tag +"',"
			+ "folder='" + req.body.folder +"',"
			+ "files='" + req.body.files +"',"
			+ "iframe='" + req.body.iframe +"',"
			+ "date='" + req.body.date +"',"
			+ "type='" + req.body.type + "' "
			+ "WHERE _id=" + req.params.id
			);
		res.json(true);

	})
	.delete('/contenus/article/:id', function(req, res) {

	    console.log('DELETE article')

	    console.log(req.params.id)

	    var deletion = client.query("DELETE FROM articles WHERE _id="+ req.params.id +"");

	    res.json(true);
	  
	})
	.post('/contenus/association', function(req, res) {

	    console.log('POST association')

	    console.log(req.body,req.params.id)	   
		
		var update = client.query("INSERT INTO associations (nom,description,icone) VALUES ('"
			+ req.body.nom +"','"
			+ req.body.description +"','"
			+ req.body.icone
			+ "')");

	})
	.put('/contenus/association/:id', function(req, res) {

	    console.log('PUT association')

	    console.log(req.body,req.params.id)

		var update = client.query("UPDATE associations SET "
			+ "nom='" + req.body.nom +"',"
			+ "description='" + req.body.description +"',"
			+ "icone='" + req.body.icone +"' "
			+ "WHERE _id=" + req.params.id
		);
		res.json(true);

	})
	.delete('/contenus/association/:nom', function(req, res) {

	    console.log('DELETE association')

	    console.log(req.params.nom)

	    var deletion = client.query("DELETE FROM associations WHERE nom='"+ req.params.nom +"'");

	    res.json(true);
	  
	});



	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'))
	})

});


