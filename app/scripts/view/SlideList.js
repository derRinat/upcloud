/** Slides list view */

define(['jquery', 'underscore', 'backbone', 'model/SlideList', 'view/Slide', 'config', 'bootstrap'], function($, _, Backbone, SlideList, SlideView, Config) {

    return Backbone.View.extend({

        el: '#carousel',

        initialize: function() {
            this.render();
        },

        render: function() {

            var self = this;

            if(this.collection.length > 0) {
                this.clearSlides();
                _.each(this.collection.models, function(model, key) {
                    self.addOne(model, key);
                })
            }

            this.initCarousel();
        },

        initCarousel: function() {
            $(this.el).carousel();
        },

        clearSlides: function() {
            $(this.el).find('.carousel-inner').empty();
            $(this.el).find('.carousel-indicators').empty();
        },

        createSlideIndicator: function(item, index) {

            var li = $('<li>');
            li.attr({
                'data-target': this.$el.selector,
                'data-slide-to': index,
            });

            if(item.get('active'))
                li.addClass("active");
            return li;
        },

        addOne: function(item, index) {
            var itemView = new SlideView({ model: item});
            $(this.el).find('.carousel-inner').append(itemView.render().el);
            $(this.el).find('.carousel-indicators').append(this.createSlideIndicator(item, index));
            return this;
        },
    })
})