var app = app || {};

app.views.Accueil = Backbone.View.extend({

    content: $( '#accueil_template' ).html(),

    events: {
        'click .accueil_item': function(elem) {
            var id = $(elem.currentTarget).attr('id');
            console.log(id);
            app.router.navigateTo(id, true);
        }
    },

    initialize: function() {
        console.log('Accueil initialize');
    },

    render: function() {
        this.$el.html(this.content);
    },


});