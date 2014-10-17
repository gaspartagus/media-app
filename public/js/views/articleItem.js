
var app = app || {};

app.views.ArticleItem = Backbone.View.extend({
    tagName: 'div',
    className: 'article_item',
    template: _.template( $( '#article_item_template' ).html() ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    }
});