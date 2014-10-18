var app = new Backbone.Marionette.Application();

app.models = {};
app.collections = {};
app.views = {};

app.addRegions({
	associationsRegion: "#associations",
	articlesRegion: "#articles",
	tableau: '#tableau',

});


app.vent.on("routing:started", function(){
	Backbone.history.stop();
  	if( ! Backbone.History.started) Backbone.history.start();
});

