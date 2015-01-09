var localArticles,
	favoris,
	user_id;

function fetchTheNews(){
	$.get(root + "touslesarticles",function(data){
		localArticles = data;
		localStorage.articles = JSON.stringify(data);
	});

	$.get(root + "touteslesassos",function(data){
		localAssos = data;
		localStorage.assos = JSON.stringify(data);
		console.log(localAssos);
	});
}

$(document).ready(function(){
	//app.router = new app.Router();
	app.start();
	if(navigator.onLine){
		fetchTheNews();
	} else {
		localArticles = JSON.parse(localStorage.articles);
		localAssos = JSON.parse(localStorage.assos);
	}


	// if(!localStorage.getItem("articles")) {
	// 	$.get(root + "touslesarticles",function(data){
	// 		localArticles = data;
	// 		localStorage.articles = JSON.stringify(data);
	// 	});
	// } else localArticles = JSON.parse(localStorage.articles);

	// if(!localStorage.getItem("assos")) {
	// 	$.get(root + "touteslesassos",function(data){
	// 		localAssos = data;
	// 		localStorage.assos = JSON.stringify(data);
	// 	});
	// } else localAssos = JSON.parse(localStorage.assos);

	if(!localStorage.getItem("favoris")) {
		favoris = [];
	} else favoris = JSON.parse(localStorage.favoris);

	if(!localStorage.getItem("user_id")) {
		user_id = Math.floor(Math.random()*1000000000);
		localStorage.user_id = user_id;

	} else user_id = parseInt(localStorage.user_id);
});