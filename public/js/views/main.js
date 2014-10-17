// js/views/main.js

var app = app || { models: {}, collections: {}, views: {} };

app.views.MainView = Backbone.View.extend({
    el: '.main',

    initialize: function() {
        console.log('mainView initialize');

        this.menu = new app.views.MenuView();
    },

    loadCurrentView: function(view) {
    // Arrêt des listeners sur la vue précédente
        if(this.currentView) {
            console.log('Replacing currentView events')
            this.currentView.undelegateEvents();
            this.currentView.stopListening();
        }

        // Update de la vue
        this.currentView = view;
        this.currentView.render();
    }
});

app.views.MenuView = Backbone.View.extend({
    el: $('#left'),

    events: { 
        'click #artistes': function(elem) {

            app.router.navigateTo('', true);
        },
        'click #concerts': function(elem) {

            app.router.navigateTo('categories', true);
        },
        'mouseover #menu_out': function(elem) {
            console.log('navigation vers le contenu principal');
            $('#left').removeClass('nav');
            $('.filter').removeClass('actif');
            //app.mainView.mouse.focus($('.planet')[0]);
            app.mainView.currentView.focus() ;

        },
    },

    initialize: function(options) {
        // this.nbFavorites = options.nbFavorites;
        // this.nbEpisodes = options.nbEpisodes;

    },

    render: function() {
        $(this.el).html(menuTemplate);
        this.renderStats();

        this.on('changeStats', this.renderStats, this);
    }
});