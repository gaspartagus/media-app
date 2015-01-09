app.models.Image = Backbone.Model.extend({
    defaults: {
    	folder: "",
    	url: "",
    	_id: 0
    }
});

app.collections.Images = Backbone.Collection.extend({
	model: app.models.Image
});

app.views.Thumbnail = Backbone.Marionette.ItemView.extend({
	template: "#thumbnail_template",
	tagName: 'div',
	className: 'gallery-icon-container'
});

app.views.Article = Backbone.Marionette.CompositeView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#article_template",
	childView: app.views.Thumbnail,
	childViewContainer: "#gallery",

	initialize: function(){
		if(favoris.indexOf(this.model.get('_id'))>-1)
			this.model.attributes.liked = 'liked';
		else
			this.model.attributes.liked = '';
	},
	onRender: function(){
		// debugger;
	},

	events: {
		'click .gallery-icon': function(elem) {
			var url = $(elem.currentTarget).attr('data-url');
			var files = _.map(this.collection.models, function(e){ return e.attributes.url; });
			console.log(this.collection,url,files.indexOf(url));
			app.controller.gallerie(this.collection.models[0].get('_id'),files.indexOf(url));
		},
		'click .action_container2': function(elem) {
			$(elem.currentTarget).toggleClass('liked');
			var id = this.collection.models[0].get('_id');
			if(favoris.indexOf(id) > -1)
				favoris = _.without(favoris,id);
			else
				favoris.push(id);
			localStorage.favoris = JSON.stringify(favoris);
		}
	}
});