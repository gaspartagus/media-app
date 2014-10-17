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
	// initialize: function(options) {
	// 	if(options.tag) { // options.hasOwnProperty('tag'))
	// 		if(options.type) {
	// 			this.url = '/articles/' + options.tag + '/' + options.type;
	// 		} else {
	// 			this.url = '/articles/' + options.tag;
	// 		}
	// 	} else {
	// 		this.url = '/articles';
	// 	}
	// },
	model: app.models.ArticleItem
});

app.views.ArticleItem = Backbone.Marionette.ItemView.extend({
	template: "#article_item_template",
	tagName: 'li',
	className: 'article_item',

	initialize: function() {
		this.model.attributes.image = JSON.parse(this.model.attributes.files)[0];
		if(favoris.indexOf(this.model.get('_id'))>-1)
			this.model.attributes.liked = 'liked';
		else
			this.model.attributes.liked = '';
	},

	events: {
		'click .description_container': function(elem) {
			app.controller.article(this.model.attributes._id);
		},
		'click .glyphicon-heart': function(elem) {
			$(elem.currentTarget).parent().toggleClass('liked');
			console.log(this.model.attributes);
			var id = this.model.get('_id');
			if(favoris.indexOf(id) > -1)
				favoris = _.without(favoris,id);
			else
				favoris.push(id);
			localStorage.favoris = JSON.stringify(favoris);
		}
	}
});

app.views.Articles = Backbone.Marionette.CompositeView.extend({
	tagName: "ul",
	className: "main_nav",
	template: "#articles_template",
	childView: app.views.ArticleItem,
	childViewContainer: "#articles"
});

