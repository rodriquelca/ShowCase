(function(app) {

    //var _field = {};

    var _input = {
        init: function(opts) {
            var i;
            this.config =_.extend(
                {
                    label: 'default',
                    floatingLabel: false,
                    disabled: false
                } ,opts);
            app.addImportLink(app.config.componentPrefix + '/paper-input/paper-input.html');
            this._create();
        },
        _create: function() {
            var i,
                container = document.querySelector(app.$rootEl.selector);
                //space = document.createElement('br');

            //container.appendChild(space);
            var input = document.createElement('paper-input');
            input.label =this.config.label;
            input.floatingLabel = this.config.floatingLabel;
            input.disabled = this.config.disabled;

            container.appendChild(input);
            console.log(this);
            console.log('create our first field');

        }
    };
    app.augment("input", _input, false);
})(parent.POLY.App);