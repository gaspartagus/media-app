
var root = "https://nameless-ravine-5052.herokuapp.com/";

var app = new Backbone.Marionette.Application();

app.models = {};
app.collections = {};
app.views = {};

app.addRegions({
	mainRegion: ".main",
	navTop: '.header',
	navBottom: '#footer',
	// titre: "#position"

});

var largeur = $('.main').width();
var hauteur = $('.main').height();

app.vent.on("routing:started", function(){
	Backbone.history.stop();
  	if( ! Backbone.History.started) Backbone.history.start();
});

var titleRegion = $("#position");
function showTitle(title) {
	titleRegion.html(title);
}

// app.models.menu = Backbone.Model.extend({});

// AngryCat = Backbone.Model.extend({});


// AngryCats = Backbone.Collection.extend({
//   model: AngryCat
// });

// AngryCatView = Backbone.Marionette.ItemView.extend({
//   template: "#angry_cat-template",
//   tagName: 'tr',
//   className: 'angry_cat'
// });

// var MyView = Backbone.Marionette.ItemView.extend({
//   template: "#accueil_template"
// });

// var view = new MyView();

// AngryCatsView = Backbone.Marionette.CollectionView.extend({
//   tagName: "table",
//   id: "angry_cats",
//   className: "table-striped table-bordered",
//   template: "#angry_cats-template",
//   childView: AngryCatView,
 
//   // appendHtml: function(collectionView, itemView){
//   //   collectionView.$("tbody").append(itemView.el);
//   // }
// });

// app.addInitializer(function(options){
//   var angryCatsView = new AngryCatsView({
//     collection: options.cats
//   });
//   app.mainRegion.show(angryCatsView);
// });

// $(document).ready(function(){
//   var cats = new AngryCats([
//     { name: 'Wet Cat' },
//     { name: 'Bitey Cat' },
//     { name: 'Surprised Cat' }
//   ]);
 
//   app.start({cats: cats});
// });














