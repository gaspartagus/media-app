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
