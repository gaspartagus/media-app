var app = app || {};

app.models.ArticleItem = Backbone.Model.extend({
    defaults: {
        image: 'img/placeholder.png',
        title: 'No title',
        releaseDate: 'Unknown',
        keywords: 'None'
    }
});