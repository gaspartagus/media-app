app.views.Accueil = Backbone.Marionette.ItemView.extend({
	className: 'main_nav',
	template: "#accueil_template",

	events: {
		'click #pointg': function(elem) {
			down($(elem.currentTarget).attr('id'));
			app.controller.alaune();
		},
		'click #associations': function(elem) {
			down($(elem.currentTarget).attr('id'));
			app.controller.associations();
			$('.bandeau').transition({opacity: 1});
		}
	}
});

app.addInitializer(function(options){
	app.controller.accueil();
});

app.views.MenuTop = Backbone.Marionette.ItemView.extend({
	el: '#header',
	template: false,

	events: {
		'click #backwards': function(elem) {
			console.log('back');
			Backbone.history.history.back()
		},
		'click #home': function(evt) {
			app.controller.accueil();
		},
		'click #refresh': function(evt) {
			fetchTheNews();
		},
	},

	hide: function() {
		$('.bandeau').transition({opacity: 0});
	},
});

app.addInitializer(function(options){
  var navTopView = new app.views.MenuTop().render();
  //app.navTop.show(navTopView);
});

app.views.MenuBottom = Backbone.Marionette.ItemView.extend({
	el: '#footer',
	template: false,

	focus: 'alaune',

	onRender: function(){
		this.focusEl = $('.focus');
		//this.setFocusPos();
	},

	events: {
		'click .footer_item': function(elem) {
			console.log($(elem.currentTarget).attr('id'));
			this.setFocusPos($(elem.currentTarget).attr('id'));
		},
		'click #alaune': function(elem) {
			var tag = $(elem.currentTarget).attr('id');
			console.log(tag);
			app.controller.alaune();
		},
		'click #photos': function(elem) {
			app.controller.photosvideos("pointg");
		},
		'click #favoris': function(elem) {
			app.controller.favoris();
		},
		'click #bestof': function(elem) {
			app.controller.bestof();
			console.log('post profile')
			$.post('profile',{favoris: favoris, user_id: user_id},function(data){
				console.log(data);
			})
		},
	},

	setFocusPos: function(focus) {
		this.focus = focus;
		console.log(this.$el.find('#'+this.focus).offset().left)
		var focusedEl = this.$el.find('#'+this.focus);
		var left = focusedEl.position().left;
		var elWidth = focusedEl.innerWidth();
		console.log(left,elWidth);
		this.focusEl.transition({left: left, width: elWidth});
	}
});

app.addInitializer(function(options){
  var navBottomView = new app.views.MenuBottom().render();
  //app.navTop.show(navTopView);
});

app.views.MenuRight = Backbone.Marionette.ItemView.extend({
	el: '.menu_right',
	template: false,
	hidden: true,

	onRender: function(){
		// this.width = largeur - 50;
		// this.$el.width(this.width);
		// console.log(this.width);
	},

	events: {
		'click .plus': function(elem) {
			this.toggle();
		},
		'click #sons': function(elem) {
			console.log("Les sons")
			app.controller.articles("sons")
		},
		'click #news': function(elem) {
			console.log("Les News")
			app.controller.articles("news")
		},
	},

	toggle: function() {
		if(this.hidden)
		{
			this.$el.transition({x: -this.width });
			this.hidden = false;
		}
		else
		{
			this.$el.transition({x: 0 });
			this.hidden = true;
		}

	},
});

app.addInitializer(function(options){
  var navLeftView = new app.views.MenuRight().render();
  //app.navTop.show(navTopView);
});