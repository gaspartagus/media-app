app.models.Article = Backbone.Model.extend({
    defaults: {
        image: '',
        association: 'BDE',
        evenement: 'Orgie',
        date: 'Hier',
        titre: 'Titre',
        accroche: 'Phrase d\'accroche',
        descriptif: 'Descriptif',
        folder:"",
        files:""
    }
});

app.collections.Articles = Backbone.Collection.extend({
	model: app.models.Article
});

app.views.ArticleItem = Backbone.Marionette.ItemView.extend({
	template: "#article_item_template",
	tagName: 'a',
	className: 'list-group-item',

	initialize: function() {
		this.model.attributes.image = JSON.parse(this.model.attributes.files)[0];
	},

	events: {
		'click': function(elem) {
			app.controller.article(this.model.attributes._id);
		},
	}
});

app.views.Articles = Backbone.Marionette.CompositeView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#articles_template",
	childView: app.views.ArticleItem,
	childViewContainer: ".articles_item_container",

	events: {
		'click .new_article': function(elem) {
			var articleModel = new app.models.Article();
			app.tableau.show(new app.views.Article({ model: articleModel }));
		}
	}
});

app.views.Article = Backbone.Marionette.ItemView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#article_template",

	events: {
		'click .photos_nav': function(elem) {
			// down(this.model.attributes.nom);
			var tag = this.model.attributes.nom,
				type = elem.currentTarget.id;
			app.controller.articles(tag,type);
		}
	}
});
