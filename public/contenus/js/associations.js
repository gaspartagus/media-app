app.models.Association = Backbone.Model.extend({
    defaults: {
    	nom: "bde",
    	description: "Une association de gens heureux",
    	icone: ""
    }
});

app.collections.Associations = Backbone.Collection.extend({
	model: app.models.Association
});

app.views.ArticleItem = Backbone.Marionette.ItemView.extend({
	template: "#association_item_template",
	tagName: 'a',
	className: 'list-group-item',

	events: {
		'click': function(elem) {
			app.controller.article(this.model.attributes.nom);
		},
	}
});

app.views.Associations = Backbone.Marionette.CompositeView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#associations_template",
	childView: app.views.ArticleItem,
	childViewContainer: ".associations_item_container",

	events: {
		'click .nouvelle_asso': function(elem) {
			var assoModel = new app.models.Association();
			app.tableau.show(new app.views.Association({ model: assoModel }));
		}
	}
});




app.views.Association = Backbone.Marionette.ItemView.extend({ // Vue tableau
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
