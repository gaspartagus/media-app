

var myController = Backbone.Router.extend({

	initialize: function(options){

	},

	routes: {
		"articles": "articles",
		"associations": 'associations'
	},
	associations: function(){
		var collection = new app.collections.Articles(localAssociations);
		var articlesView = new app.views.Photos({
			collection: collection
		});
	},
	articles: function(tag,type){
		var selection = _.sortBy(localArticles,"date");
		var collection = new app.collections.Articles(selection);
		var articlesView = new app.views.Photos({
			collection: collection
		});
		app.articlesRegion.show(articlesView);
	},
	article: function(id){
		var article = _.where(localArticles, {_id: parseInt(id)})[0];
		console.log(localArticles);
		var articleModel = new app.models.ArticleItem(article);
		app.tableau.show(new app.views.Article({ model: articleModel }));

		Backbone.history.navigate("article/"+ id);
	},
	association: function(nom){
		var asso = _.where(localAssos, {nom: nom })[0];
		console.log(localAssos);
		var assoModel = new app.models.Association(asso);
		app.tableau.show(new app.views.Association({ model: assoModel }));

		Backbone.history.navigate("association/"+ nom);
	},
});

// create an instance
app.controller = new myController();



Backbone.history.start();