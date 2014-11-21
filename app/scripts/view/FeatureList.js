/** Feature list view */

define(['jquery', 'underscore','backbone', 'model/FeatureList', 'view/Feature', 'config'], function($, _, Backbone, FeatureList, FeatureView, Config) {

    return Backbone.View.extend({

        el: '.features',

        initialize: function() {
            this.render();
        },

        render: function() {
            var columns = Config.features.columnCount,
                self    = this;

            if(this.collection.length > 0) {

                self.$el.empty();

                var perColumn = Math.ceil(this.collection.length/columns),
                    ul = null;

                _.each(this.collection.models, function(el, key) {

                    if(key%perColumn == 0) {
                        ul = self.createULList();
                        $(self.el).append(ul);
                    }

                    self.addOne(el, ul);
                });
            }
        },

        createULList: function() {
            var ul = $('<ul>');
            ul.addClass('list-unstyled col-lg-6');
            return ul;
        },

        addOne: function(item, container) {
            var itemView = new FeatureView({ model: item});

            container.append(itemView.render().el);
            return this;
        },
    })
})