app.models.Association = Backbone.Model.extend({
    defaults: {
    	nom: "bde",
    	description: "Une association de gens heureux"
    }
});

app.views.Association = Backbone.Marionette.ItemView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#association_template",

	events: {
		'click .photos_nav': function(elem) {
			// down(this.model.attributes.nom);
			var tag = this.model.attributes.nom,
				type = elem.currentTarget.id;
			app.controller.articles(tag,type);
		}
	}
});
