/** Main applicaiton view */

define(
    [
     'jquery',
     'underscore',
     'backbone',
     'validator',
     'config',
     'model/App',
     'model/FeatureList',
     'model/SlideList',
     'view/Featurelist',
     'view/SlideList',
     'text!template/App.html'
    ],

    function($,
             _,
             Backbone,
             Validator,
             Config,
             model,
             FeatureCollection,
             SlideCollection,
             FeatureCollectionView,
             SlideCollectionView,
             template) {

        'use strict';

        return Backbone.View.extend({

            el      : $('.login'),
            model   : model,
            template: _.template(template),
            events  : {
                'click .change-locale':'changeLocale',
                'blur input[type="email"]':'validateEmail',
                'blur input[type="password"]':'validatePassword',
                'submit form': 'validateRegister'
            },

            /**
             * Init application view
             * @return {[type]} [description]
             */

            initialize: function() {
                this.render();
                this.bindEvents();
                this.setLocale(Config.locale.default);

                this.initFeatures();
                this.initSlides();
            },

            /**
             * Init features subview
             * @return {[type]} [description]
             */
            initFeatures: function() {
                var features = Config.locale.available[this.model.get('locale')].messages.features,
                    featuresModels = _.map(features, function(f) { return {text: f}; });

                new FeatureCollectionView({
                    collection: new FeatureCollection(featuresModels)
                });
            },

            /**
             * Init slides subview
             * @return {[type]} [description]
             */
            initSlides: function() {
                var slides = Config.locale.available[this.model.get('locale')].messages.slides,
                    slidesModels = _.map(slides,
                        function(f, k) {
                            return {source: f, active: !!(k==0)};
                        }
                    );

                new SlideCollectionView({
                    collection: new SlideCollection(slidesModels)
                })
            },

            /**
             * Bind model events
             * @return {[type]} [description]
             */
            bindEvents: function() {
                this.model.on('change:locale', this.render, this);
            },

            /**
             * Add locales to view in accordance with config
             */
            addLocales: function() {

                var self = this,
                    keys = _.keys(Config.locale.available);

                if(keys.length > 0) {
                    _.each(keys, function(l) {
                        $(self.el).find('.language-set').append(self.createLocaleButton(l));
                    });
                }
            },

            /**
             * Set current locale
             * @param {String} locale
             */
            setLocale: function(locale) {

                this.model.set('messages', Config.locale.available[locale].messages);
                this.model.set('locale', locale);

                $(this.el).find('.language-set div').removeClass('active');
                $(this.el).find('.language-set div[data-locale="'+locale+'"]').addClass('active');
            },

            /**
             * Create locale button in view
             * @param  {String} localeKey
             * @return {Object} button
             */
            createLocaleButton: function(localeKey) {
                var locale = Config.locale.available[localeKey],
                    button   = $('<div>');

                button.addClass('btn btn-default change-locale');
                button.attr('data-locale', localeKey);
                button.text(locale.title);

                return button ;
            },

            /**
             * Event function, changes current locale
             * @param  {Object} DOM Object
             * @return {[type]}   [description]
             */
            changeLocale: function(e) {
                this.setLocale($(e.currentTarget).attr('data-locale'));
            },

            /**
             * View renderer
             * @return {[type]} [description]
             */
            render: function() {
                $(this.el).html(this.template(this.model.toJSON()));
                this.addLocales();
                this.initFeatures();
                this.initSlides();
                return this;
            },

            /**
             * Page action, user registration
             * @return {[type]} [description]
             */
            registerUser: function() {
                alert("It's clear, please register user");

                var data = {};

                data.email    = this.model.get('email');
                data.password = this.model.get('password');

                if(this.model.get('valid')) {
                    // TODO: http request (ajax?)
                    // TODO: socket request
                    // TODO: register action + callback
                }
            },

            // Validators
            // TODO: place validators as helpers in other module
            // TODO: disable submit buttons until form data is invalid?

            /**
             * Email validator
             * @param  {Object} e
             * @return {[type]}   [description]
             */
            validateEmail: function(e) {

                var t = $(e.target);

                if(!Validator.isEmail(t.val())) {
                    t.addClass('error');
                }
                else {
                    this.model.set('email', t.val());
                    t.removeClass('error');
                }
            },

            /**
             * Password validator
             * @param  {Object} e
             * @return {[type]}   [description]
             */
            validatePassword: function(e) {

                var t = $(e.target),
                    min = Config.register.password.minlength,
                    max = Config.register.password.maxlength;

                if(!Validator.isLength(t.val(), min, max)) {
                    t.addClass('error');
                }
                else {
                    var ident = t.attr('name') == 'password1' ? 'password1' : 'password2';
                    this.model.set(ident, t.val());
                    t.removeClass('error');
                }
            },

            /**
             * Validate registation form
             * @param  {Object} e [description]
             * @return {[type]}   [description]
             */
            validateRegister: function(e) {

                e.preventDefault();

                this.model.set('valid', true);

                if(!Validator.isEmail(this.model.get('email'))) {
                    this.model.set('valid', false);
                    $('input[type="email"]').addClass('error');
                }

                if(!Validator.equals(this.model.get('password1'), this.model.get('password2'))) {
                    this.model.set('valid', false);
                    $('input[type="password"]').addClass('error');
                }

                if(this.model.get('valid')) {
                    this.registerUser();
                }
                else {
                    alert('Form validation error, show notification here...');
                }

                return false;
            }
        })
    }
);