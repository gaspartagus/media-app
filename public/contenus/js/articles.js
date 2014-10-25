app.models.Article = Backbone.Model.extend({
    defaults: {
        image: '',
        tag: '',
        date: 0,
        titre: '',
        resume: '',
        folder: '',
        files: ''
    }
});

app.collections.Articles = Backbone.Collection.extend({
	model: app.models.Article
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

app.views.Articles = Backbone.Marionette.CompositeView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#articles_template",
	childView: app.views.ArticleItem,
	childViewContainer: ".articles_item_container",

	events: {
		'click .new_article': function(elem) {
			console.log('nouveau')
			var articleModel = new app.models.Article();
			app.tableau.show(new app.views.Article({ model: articleModel }));
		}
	}
});

app.views.Article = Backbone.Marionette.ItemView.extend({
	tagName: "div",
	className: "main_nav",
	template: "#article_template",

	events: {
		'click textarea': function(e){
			$(e.currentTarget).redactor({ focus: true });
		},
		'change input[name=folder]': function(e){
			var strings = $(this).val().split('/');
			var folder = strings[strings.length - 1];
			$(this).val(folder);
			$.get('https://googledrive.com/host/' + folder, function(data,err){
				var jqFiles = $(data).find('.folder-cell a').map(function(index,a){ return $(a).attr('href').split('/')[3] });
				var files = [];
				jqFiles.each(function(index,href){
					if(href.split('.').length>1)
						files.push(href);
				})
    			$('input[name=files]').val(JSON.stringify(files))
				console.log(folder,files);
		    })


		},
		'change select[name=type]': function(e){
			console.log('change you bastard')


		},
		'click button[type=submit]': function(e) {
			e.preventDefault();

			var post = {
				titre: $( "#article_form input[name=titre]" ).val(),
				resume: $( "#article_form textarea[name=resume]" ).val(),
				date: $( "#article_form input[name=date]" ).val(),
				folder: $( "#article_form input[name=folder]" ).val(),
				tag: $( "#article_form select[name=tag]" ).val(),
				type: $( "#article_form select[name=type]" ).val(),
				files: $( "#article_form input[name=files]" ).val()
			}
			console.log(post)


			$.post( "new-article", post );
		}
	}
});
