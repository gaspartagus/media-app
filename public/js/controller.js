var arbre = {
	associations: {
		param: true,
		children: {
			photos: 1,
			videos: 1
		}

	},
	pointg: {
		alaune: 1,
		photosvideos: {
			photos: 1,
			videos: 1
		},
		bestof: 1,
		favoris: 1
	}
}
var chemin = ['accueil']


// define a controller
var myController = Backbone.Router.extend({

	initialize: function(options){

	},

	routes: {
		"": "accueil",
		"accueil": "accueil",
		"associations": "associations",
		"associations/:nom": "association",
		"associations/pointg/alaune": "alaune",
		"associations/:tag/photosvideos": "photosvideos",
		"associations/:tag/:type": "articles",
		"article/:id": "article",
		"article/:id/:index": "gallerie",
		"favoris": "favoris",
		"bestof": 'bestof',
		// "pointg/bestof": "bestof",
		// "pointg/favoris": "favoris"
	},

	accueil: function(){
		var accueilView = new app.views.Accueil();
		app.mainRegion.show(accueilView);
	},
	associations: function(){
		var associationsView = new app.views.Associations();
		app.mainRegion.show(associationsView);
		Backbone.history.navigate("associations");
	},
	alaune: function(){
		var collection = new app.collections.Articles(localArticles);
		var vue = new app.views.Articles({
			collection: collection
		});
		app.mainRegion.show(vue);
		Backbone.history.navigate("associations/pointg/alaune");
	},
	photosvideos: function(tag){
		var selection = _.where(localArticles,{tag: tag});
		var collection = new app.collections.Articles(selection);
		var vue = new app.views.Photos({
			collection: collection
		});
		app.mainRegion.show(vue);
		Backbone.history.navigate("associations/"+tag+"/photosvideos");
	},
	articles: function(tag,type){
		var selection = _.where(localArticles,{tag: tag, type: type});
		var collection = new app.collections.Articles(selection);
		var articlesView = new app.views.Photos({
			collection: collection
		});
		app.mainRegion.show(articlesView);
		showTitle(tag);
		Backbone.history.navigate("associations/"+ tag + "/" + type);
	},
	association: function(nom){
		var ass = _.where(localAssos, { nom: nom })[0]
		var assoc = new app.models.Association(ass );
		app.mainRegion.show(new app.views.Association({ model: assoc }));
		showTitle(nom)
		Backbone.history.navigate("associations/"+nom);
	},
	article: function(id){
		var article = _.where(localArticles, {_id: parseInt(id)})[0];
		console.log(localArticles);
		var folder = article.folder,
			col;
		try{
			col = _.map(JSON.parse(article.files),function(e){return {url: e, folder: folder, _id: id};});
			
		} catch(err){
			col = [];
		}
		var gallerie = new app.collections.Images(col);
		var articleModel = new app.models.ArticleItem(article);
		app.mainRegion.show(new app.views.Article({ collection: gallerie, model: articleModel }));
		showTitle(article.titre);
		Backbone.history.navigate("article/"+ id);
	},
	gallerie: function(id,focus){
		var article = _.where(localArticles, {_id: parseInt(id)})[0],
			files = JSON.parse(article.files),
			folder = article.folder;
		console.log(files,focus)
		var album = new app.models.Album({folder: folder, album: files, focusEl: focus})
		console.log(album)
		app.mainRegion.show(new app.views.Gallerie({ model: album }));
		$("#footer").css("transform","translateY(150px)");

		Backbone.history.navigate("article/"+ id + "/" + focus);
	},
	favoris: function() {
		var selection = localArticles.filter(function(el){
			return favoris.indexOf(el._id) > -1;
		});
		var collection = new app.collections.Articles(selection);
		var articlesView = new app.views.Articles({
			collection: collection
		});
		app.mainRegion.show(articlesView);

		Backbone.history.navigate("favoris");

	},
	bestof: function() {

		$.get('bestof',function(best){
			console.log(best);
			localArticles.forEach(function(article){
				var sel = _.find(best,{article_id: article._id});
				if(sel){
					article.popularity = parseInt(sel.popularity);
				}
				else article.popularity = 0;
			});
			var selection = _.sortBy(localArticles.filter(function(el){
					return el.popularity > 0;
				}),function(el){
				return -el.popularity;
			});
			var collection = new app.collections.Articles(selection);
			var articlesView = new app.views.Articles({
				collection: collection
			});
			app.mainRegion.show(articlesView);

			Backbone.history.navigate("bestof");

		})

	}
});

// create an instance
app.controller = new myController();

// use the built in EventBinder
// app.controller.listenTo(app.controller, "stuff:done", function(stuff){
// 	console.log(stuff);
// });


// var Router = Backbone.Marionette.AppRouter.extend({
// 	controller: app.controller,
// 	appRoutes: {
// 		"": "accueil",
// 		"accueil": "accueil",
// 		"associations": "associations",
// 		"associations/:nom": "association",
// 		"pointg/alaune": "alaune",
// 		"pointg/photos": "photos",
// 		// "pointg/bestof": "bestof",
// 		// "pointg/favoris": "favoris"
// 	}
// });
// app.router = new Router();

Backbone.history.start();// { pushState: true });