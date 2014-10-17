app.models.Album = Backbone.Model.extend({
    defaults: {
    	focusEl: 0,
    	album: [],
    	folder:""
    }
});


app.views.Gallerie = Backbone.Marionette.ItemView.extend({ // options : { firstEl, urlArray/collection }
	template: "#gallerie_template",
	tagName: 'div',
	className: 'gallerie main_nav',
	// initialize: function(options) {

	// },

	events: {
		'click .image': function(elem) {
			// console.log(this, elem);
			var images = this.model.get("album"),
				focus = this.model.get("focusEl")
			if(elem.clientX > 300 && focus < images.length-1) {
				console.log("avant")
				this.model.attributes.focusEl += 1;
				this.switch(); 
			} else if(elem.clientX < 300 && focus > 0) {
				console.log("arriere")
				this.model.attributes.focusEl -= 1;
				this.switch(); 
			} else return false;
		},
		'click .preview': function(elem) {
			console.log(this, elem);

			var url = $(elem.currentTarget).attr('data-url'),
				images = this.model.get("album"),
				focus = images.indexOf(url);

			this.model.attributes.focusEl = focus;
			this.switch();
		}
	},

	switch: function() {
		var focusEl = this.model.get('focusEl');
		var album = this.model.attributes.album;
		$('.image')
		.css(
			"background-image",
			"url('https://googledrive.com/host/"
				+ this.model.get('folder') +"/"
				+ album[focusEl] +"')");
		var item = $('.preview').filter(function(index,el){
			return $(el).attr('data-url') == album[focusEl];
		});

		$('.tiroir').css('left',(100-parseInt($(item).position().left))+'px');
	}
});

// app.views.Article = Backbone.Marionette.CompositeView.extend({
// 	tagName: "div",
// 	className: "main_nav",
// 	template: "#article_template",
// 	childView: app.views.Thumbnail,
// 	childViewContainer: "#gallery"
// });