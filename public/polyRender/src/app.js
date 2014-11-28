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
            //att.value = "//gdata.youtube.com/feeds/api/videos/";
            //att.value = "http://192.168.11.172:9000/api/1.0/workflow/project/72594271153a9c2fb834d95093752124/dynaforms";
            att.value = "http://173.244.64.117:8080/api/1.0/workflow/project/72594271153a9c2fb834d95093752124/dynaforms";
            core.setAttributeNode(att);
            var att = document.createAttribute("headers");
            att.value = '{"Authorization": "Bearer 74375a74a605c8c0186718ae612c6dd538739d3e"}';
            core.setAttributeNode(att);
            //var att = document.createAttribute("params");
            ////att.value = '{"alt":"json", "q":"chrome"}';
            //core.setAttributeNode(att);

            var att = document.createAttribute("on-core-response");
            att.value = '{{handleResponse}}';
            core.setAttributeNode(att);

            document.addEventListener('polymer-ready', function() {
                var ajax = document.querySelector('core-ajax');
                ajax.addEventListener('core-response', function(e) {
                    //console.log(e.detail.response);
                    //// or
                    //console.log(e.target.response);
                    // or
                    console.log(ajax.response);
                    response = JSON.parse(ajax.response);
                    //console.log(response[0]);
                    fields = response[0];

                        _app.input.init({
                                name: 'firstName',
                            label: 'Nick Name',
                            floatingLabel: false,
                            disabled: false
                        });

                    //simple radio button
//        POLY.App.radioButton.init({
//        });

//        radio group

        POLY.App.radioGroup.init({
            label: 'Genre',
            selected: 'adidas',
            name:'kind',
            options: [
                {
                    label: 'Female',
                    name: 'female'

                },
                {
                    label: 'Male',
                    name: 'male'
                }
            ]
        });

//        checkbox
        POLY.App.checkGroup.init({
                label:'News Letter',
                options: [
                    {
                        label: 'Sports',
                        name: 'sport'
                    },
                    {
                        label: 'Cars',
                        name: 'cars'
                    }
                ]
                });


        //POLY.App.checkGroup.init({
        //    label:'asdfasdf'
        //});
                POLY.App.checkbox.init({

                });
                });
            });

            POLY.App.button.init({
                label: 'Submit',
                'callback': 'POLY.App.submit(this)'
//            disabled: false
            });
            POLY.App.combobox.init({
                label: 'City',
            options:[
                {
                    label: 'La Paz'
                },
                {
                    label: 'Oruro'
                }
            ]
        });
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
            var a = window.frames;
            var link = a.document.createElement('link');
            link.rel = 'import';
            link.href = url;
            link.onload = function(e) {
                var post = this.import.querySelector('#blog-post');
                if (post != null) {
                    var container = a.document.querySelector('#container');
                    container.appendChild(post.cloneNode(true));
                }
            };
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
            console.log(form.children[3].firstElementChild)
            console.log(form.children[3].firstElementChild.value);
            // Respond to events it fires.
            ajax.addEventListener('core-response', function(e) {
                //console.log(this.response[3]);
            });
            console.log('APP_UID', window.location.href);

            ajax.url = 'http://192.168.0.172:9000/api/1.0/workflow/cases/71298561653da7c5f7e0a50031927457/variable';
            //ajax.headers = '{"Authorization": "Bearer a178c40f6df7fa7d187615562449ea5ccf55a46a"},{"Content-Type": "application/json"}]';
            ajax.headers = '{"Authorization": "Bearer f62dbc57a37640176d59636ba42757e2382ddfb0"}';
            ajax.method = 'PUT'

            //var input = document.querySelector('input');
            //console.log(input.value);
            ajax.params = '{"FIELD_NICK": "asdfasdfasd"}'
            ajax.params = '{"FullName": "'+ form.children[3].firstElementChild.value +'"}'
            ajax.go(); // Call its API methods.




            ajax.url = 'http://192.168.0.172:9000/api/1.0/workflow/cases/74375a74a605c8c0186718ae612c6dd538739d3e/route-case';
            //ajax.headers = '{"Authorization": "Bearer a178c40f6df7fa7d187615562449ea5ccf55a46a"},{"Content-Type": "application/json"}]';
            //ajax.headers = '{"Authorization": "Bearer 41ff37992b5c267a4efe8c1e826e3c1f66f9247f"}';
            ajax.method = 'PUT'

            //var input = document.querySelector('input');
            //console.log(input.value);
            //ajax.params = '{"FIELD_NICK": "asdfasdfasd"}'
            //ajax.params = '{"FullName": "'+ form.children[3].firstElementChild.value +'"}'



            //window.location = "/";
        }
    };
}());