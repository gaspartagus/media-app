var app = app || {};

app.collections.Articles = Backbone.Collection.extend({
    model: app.models.ArticleItem
});