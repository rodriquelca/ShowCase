/**
 * Created by dev on 26/11/2014.
 */
var POLY = POLY || {};

POLY.App = (function() {
    var _app,
        _modules = {};
    var _make$ = function(selector) {
        return selector instanceof $ ? selector : $(selector);
    };
    function App(opts) {
        var appId = _.uniqueId("PolyApp_");
        opts = opts || {};
        return _.extend({
            /**
             * Unique application ID
             * @property {String}
             */
            appId: appId,

            /**
             * Base element to use as the root of the app.
             *
             * This is a jQuery/Zepto node.
             * @property {Object}
             */
            $rootEl: _make$(opts.el || "body"),

            /**
             * Alias to Poly.Api
             * @property {Object}
             */
            api: null,

            /**
             * Additional components.
             *
             * These components are created and rendered only once when the application starts.
             * Application specific code is responsible for managing the components
             * after they have been put into DOM by the framework.
             */
            additionalComponents: {}

        }, this);
    };
    return {
        /**
         * Initializes an app.
         * @param {Object} opts(optional) Configuration options
         *
         * - el: root app element
         * @return {App} Application instance
         * @method
         */
        init: function (opts) {
            _app = _app || _.extend(this, new App(opts));

            console.log(_app);
            console.log('init poly app');
        },

        augment: function(name, obj, init) {
            this[name] = obj;
            //_modules[name] = obj;

            if (init && obj.init && _.isFunction(obj.init)) {
                obj.init.call(_app);
            }
        },

        /**
         * Logs in this app.
         *
         * @param  {Object} credentials user credentials.
         * @param  {Object} info(optional) extra data to be passed in login request such as client user agent, etc.
         * @param  {Object} callbacks(optional) callback object.
         */
        login: function(credentials, info, callbacks) {

        },
        logout: function (callbacks, clear) {

        }
    };
}());