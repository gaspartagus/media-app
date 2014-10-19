var localArticles = [],
	localAssos = [];
$(document).ready(function(){
	//app.router = new app.Router();
	app.start();
	$.get('http://nameless-ravine-5052.herokuapp.com/touslesarticles',function(data){
		localArticles = data;
		app.controller.articles();
	});

	$.get('http://nameless-ravine-5052.herokuapp.com/touteslesassos',function(data){
		localAssos = data;
	});
		app.controller.associations();
});