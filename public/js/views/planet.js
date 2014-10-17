
var app = app || { models: {}, collections: {}, views: {} };

app.views.Planet = Backbone.View.extend({

    tagName: 'div',
    className: 'planet navigable',

    initialize: function () {
        this.id = this.model.get('tag');
        console.log('Création de la vue pour '+this.id);
    },

    render: function() {
        
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    } 
});