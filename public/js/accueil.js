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
	// app.controller.accueil();
});

app.views.MenuTop = Backbone.Marionette.ItemView.extend({
	el: '#header',
	template: false,

	events: {
		'click #backwards': function(elem) {
			console.log('back');
			if($(".main .gallerie").length)
				$("#footer").css("transform","translateY(0)");
			
			if(Backbone.history.history.length <= 2)
				app.controller.navigate(iosHistory.pop());
			else
				Backbone.history.history.back();

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
		'click #photos': function() {
			app.controller.photosvideos("pointg");
		},
		'click #favoris': function() {
			app.controller.favoris();
		},
		'click #bestof': function() {
			app.controller.bestof();
			console.log('post profile')
			$.post('profile',{favoris: favoris, user_id: user_id},function(data){
				console.log(data);
			})
		},
		'click #autres': function() {
			app.controller.autres();
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

app.views.Autres = Backbone.Marionette.ItemView.extend({
	template: "#autres_template",
	tagName: "ul",
	className: "main_nav",
	
	onRender: function(){
		// this.width = largeur - 50;
		// this.$el.width(this.width);
		// console.log(this.width);
	},

	events: {
		'click #sons': function(elem) {
			console.log("Les Sons")
			app.controller.articles("pointg","audio");
		// 	this.toggle();
		},
		'click #news': function(elem) {
			console.log("Les News")
			app.controller.photosvideos("news");
		// 	this.toggle();
		},
	},

	toggle: function() {
		if(this.$el.offset().left !== 0)
		{
			this.$el.transition({x: -this.width });
		}
		else
		{
			this.$el.transition({x: 0 });
		}

	},
});

// app.addInitializer(function(options){
//   var navLeftView = new app.views.MenuRight().render();
//   //app.navTop.show(navTopView);
// });