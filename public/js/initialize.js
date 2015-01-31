var localArticles,
	favoris,
	user_id;

function fetchTheNews(){
	$.get(root + "touslesarticles",function(data){
		localArticles = data;
		localStorage.articles = JSON.stringify(data);
		matchHash();
	});

	$.get(root + "touteslesassos",function(data){
		localAssos = data;
		localStorage.assos = JSON.stringify(data);
		console.log(localAssos);
	});
}

$(document).ready(function(){
	//app.router = new app.Router();
	localArticles = JSON.parse(localStorage.articles);
	localAssos = JSON.parse(localStorage.assos);
	
	app.start();
	if(navigator.onLine){
		fetchTheNews();
	} else {
		matchHash();
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

	

	

	bouncefix.add("main");
});


function matchHash(){
	var paths = location.hash.split("#");
	console.log(paths);
	if(paths.length > 1){
		var path = paths[1];
		// location.hash = "";
		app.controller.navigate(path,{trigger: true})
		// debugger;
	}
}