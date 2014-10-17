var app = app || {};

app.views.Articles = Backbone.View.extend({
    el: '.main',

    initialize: function( articles ) {
        this.collection = new app.collections.Articles( articles );
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderArticleItem( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderArticleItem: function( item ) {
        var articleItem = new app.views.ArticleItem({
            model: item
        });
        this.$el.append( articleItem.render().el );
    }
});