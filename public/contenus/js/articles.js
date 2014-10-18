app.models.ArticleItem = Backbone.Model.extend({
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
	model: app.models.ArticleItem
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

app.views.Photos = Backbone.Marionette.CompositeView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#photos_template",
	childView: app.views.ArticleItem,
	childViewContainer: ".photos_item_container",

	events: {
		'click .photos_nav': function(elem) {
			var tag = this.model.attributes.nom,
				type = elem.currentTarget.id;
			app.controller.articles(tag,type);
		}
	}
});
