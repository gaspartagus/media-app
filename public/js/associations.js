app.views.Associations = Backbone.Marionette.ItemView.extend({
	template: "#associations_template",
	className: 'associations',

	events: {
		'click .associations_item': function(elem) {
			var nom = $(elem.currentTarget).attr('id');
			down(nom);
			app.controller.association(nom);
			$('.bandeau').transition({opacity: 1});
		}
	}
});