/** Feature view */

define(['backbone', 'model/Slide'], function(Backbone, model) {

    var SlideTemplate = '<img src="<%= source%>">';

    return Backbone.View.extend({

        tagName: 'div',
        className: 'item',
        template: _.template(SlideTemplate),

        initialize: function() {
            this.render();
        },

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            if(this.model.get('active'))
                $(this.el).addClass('active');

            return this;
        }
    })
})