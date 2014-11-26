(function(app) {

    // Dictionary of alerts
    var _field = {};

    var _field = {
        init: function() {
            var i;
            //console.log('initiate fields');
            // llamar los componentes con sus respectivos url
            for(i = 0; i < app.config.componentsLink.length; i += 1) {
                app.addImportLink(app.config.componentsLink[i].link);
            }
            this._create();
        },
        _create: function(key, options) {
            var i;
            //here create field
            for(i = 0; i < app.config.componentsLink.length; i += 1) {
                var input = document.createElement('paper-input');
                var container = document.querySelector(app.$rootEl.selector);
                container.appendChild(input);

            }




            console.log('create our first field');

        }
    };
    app.augment("field", _field, false);
})(POLY.App);