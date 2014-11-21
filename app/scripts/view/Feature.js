/** Feature view */

define(['backbone', 'model/Feature'], function(Backbone, model) {

    var FeatureTemplate = '<%= text%>';

    return Backbone.View.extend({

        tagName: 'li',
        template: _.template(FeatureTemplate),

        initialize: function() {
            this.render();
        },

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    })
})