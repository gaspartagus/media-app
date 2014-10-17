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

