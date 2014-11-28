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
            //_app.addImportLink(_app.config.componentPrefix + '/polymer/polymer.html');
            _app.addImportLink(_app.config.componentPrefix + '/core-label/core-label.html');
            _app.addImportLink(_app.config.componentPrefix + '/core-localstorage/core-localstorage.html');
            _app.addImportLink(_app.config.componentPrefix + '/font-roboto/roboto.html');
            _app.addImportLink(_app.config.componentPrefix + '/core-ajax/core-ajax.html');

            //console.log('init poly app');
            container = document.querySelector(_app.$rootEl.selector);
            var core  =  document.createElement('core-ajax');
            var att = document.createAttribute("auto");
            core.setAttributeNode(att);
            var att = document.createAttribute("url");
            att.value = "//gdata.youtube.com/feeds/api/videos/";
            core.setAttributeNode(att);

            var att = document.createAttribute("params");
            att.value = '{"alt":"json", "q":"chrome"}';
            core.setAttributeNode(att);

            var att = document.createAttribute("on-core-response");
            att.value = '{{handleResponse}}';
            core.setAttributeNode(att);

            //var att = document.createAttribute("headers");
            //att.value = '{"X-Requested-With": "XMLHttpRequest"} ';
            //core.setAttributeNode(att);

            container.appendChild(core);

        },

        augment: function(name, obj, init) {
            this[name] = obj;
            //_modules[name] = obj;

            if (init && obj.init && _.isFunction(obj.init)) {
                obj.init.call(_app);
            }
        },

        addImportLink: function(url) {
            var link = document.createElement('link');
            link.rel = 'import';
            link.href = url;
            //link.onload = function(e) {
            //    var post = this.import.querySelector('#blog-post');
            //
            //    var container = document.querySelector('#container');
            //    container.appendChild(post.cloneNode(true));
            //};
            document.head.appendChild(link);

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

        },
        submit: function (obj) {
            alert('submit');
            var ajax = document.querySelector('core-ajax');
            //console.log(obj);
            //console.log(ajax);
            var form = document.getElementById('container');
            console.log(form.children);
            // Respond to events it fires.
            ajax.addEventListener('core-response', function(e) {
                console.log(this.response);
            });
            ajax.url = 'face';

            ajax.go(); // Call its API methods.
        }
    };
}());