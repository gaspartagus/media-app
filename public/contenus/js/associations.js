app.models.Association = Backbone.Model.extend({
    defaults: {
    	nom: "",
    	description: "",
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
			app.controller.association(this.model.attributes.nom);
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

	onRender: function(){
		this.$el.find( "textarea[name=resume]" ).html(this.model.get('resume'))
	},

	events: {
		'click textarea': function(e){
			$(e.currentTarget).redactor({ focus: true });
		},
		'click button[type=delete]': function(e){
			e.preventDefault();

			$.ajax({
			    url: 'association/'+this.model.get('nom'),
			    type: 'DELETE',
			    success: function(result) {
			        console.log(result)
			    }
			});
		},
		'click button[type=submit]': function(e) {
			e.preventDefault();

			var post = {
				nom: $( "#asso_form input[name=nom]" ).val(),
				description: $( "#asso_form textarea[name=description]" ).val(),
				icone: $( "#asso_form input[name=icone]" ).val()
			}
			console.log(post)


			$.post( "association", post );
		}
	}
});
