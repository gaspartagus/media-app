var express = require('express')
	, app = express()
	, fs = require('fs')
	, eyes = require('eyes')
	, multer  = require('multer')
	, pg = require('pg')
	, sql = require('sql')
	, bodyParser = require('body-parser')
	, ejs = require('ejs');

var DATABASE_URL = 'postgres://rxczkdjyebmxfl:b8uvjvix4Z2yflVth3n1a4tOjv@ec2-54-246-81-118.eu-west-1.compute.amazonaws.com:5432/devrau91ujvtbo'
	+ '?ssl=true';

var currentArticle,
	currentArticleId;

pg.connect(DATABASE_URL, function(err, client) {
	console.log(err,client)

	var query = client.query("SELECT * FROM articles");

	query.on('row', function(row) {
		console.log(JSON.stringify(row));
	});
});



app.set('port', (process.env.PORT || 5000))
.use(express.static(__dirname + '/public'))
.use(multer({
	dest: './uploads/'
}))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() );
// app.get('/:x', function(request, response) {
//     console.log('GET app')
// 	response.sendFile('index.html');
// })
app.get('/upload', function(request, response) {
    console.log('GET upload')
	response.render('upload.ejs');
})
app.get('/create', function(request, response) {
    console.log('GET create')
	response.render('create.ejs');
})
.get('/articles/:tag/:type', function(req, res) {
    console.log('GET articles/'+req.params.tag+'/'+req.params.type)


    pg.connect(DATABASE_URL, function(err, client) {
	    var getArticles = client.query(
	       "SELECT * FROM articles WHERE tag='"+ req.params.tag +"' AND type='"+ req.params.type +"'",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
	    	});
	});
})
.get('/articles/:tag', function(req, res) {
    console.log('GET articles/'+req.params.tag)


    pg.connect(DATABASE_URL, function(err, client) {
	    var getArticles = client.query(
	       "SELECT * FROM articles WHERE tag='"+ req.params.tag +"' ",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
	    	});
	});
})
.get('/articles', function(req, res) {
    console.log('GET articles')


    pg.connect(DATABASE_URL, function(err, client) {
	    var getArticles = client.query(
	       "SELECT * FROM articles",
	    	function(err,result){
	    		console.log(result.rows)
	    		res.json(result.rows)
	    	});
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
    
    pg.connect(DATABASE_URL, function(err, client) {
	
		var update = client.query("INSERT INTO articles_medias VALUES (" + _id + ",'" + target_path + "')");

		// query.on('row', function(row) {
		// 	console.log(JSON.stringify(row));
		// });
		//console.log(err,client)
	});


});

app.post('/new-article', function(req, res) {
    // get the temporary location of the file
    console.log('POST new-article')

    console.log(req.body)

	    
    pg.connect(DATABASE_URL, function(err, client) {
	
		var update = client.query("INSERT INTO articles (titre,resume,tag,folder,files,type) VALUES ('"
			+ req.body.titre +"','"
			+ req.body.resume +"','"
			+ req.body.tag +"','"
			+ req.body.folder +"','"
			+ req.body.files +"','"
			+ req.body.type
			+ "')");

		// var getId = client.query("SELECT _id, type FROM articles ORDER BY date DESC LIMIT 1");

		// getId.on('row', function(row) {
		// 	console.log(JSON.stringify(row));
		// 	var files = JSON.parse(req.body.files)
		// 	eyes.inspect(files)
		// 	for (var i = files.length - 1; i >= 0; i--) {
		// 		var update = client.query("INSERT INTO articles_medias VALUES (" + row._id + ",'" + files[i] + "')");
				
		// 	};
		// 	//res.render('upload.ejs', row );
		// });
		// var getImg = client.query("SELECT * FROM articles_medias");

		// getImg.on('row', function(row) {
		// 	console.log(JSON.stringify(row));
		// });
	});


});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

