// js/app.js

var app = app || { models: {}, collections: {}, views: {} };
var G = 700000,
    dt = 1,
    centre = {x: 350, y: 650},
    dt = 0.05,
    G = 70000;



(function($) {
  console.log('app.js');
  app.rootUrl = 'http://10.0.1.44:8080/';
  // app.rootUrl = 'http://3d5964dc.ngrok.com/';

  // Initialisation des variables de navigation pour l'app
  app.focusHistory = [];
  app.fromHistory = 0;
  app.tmpPos = null;

  // Mise en route de l'app
  app.router = new app.Router();
  app.mainView = new app.views.MainView({ el: this.$('#center') });
  Backbone.history.start();

})(jQuery);
