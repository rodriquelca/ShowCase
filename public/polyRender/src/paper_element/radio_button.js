(function(app) {

    //var _field = {};

    var _radio = {
        init: function(opts) {
            var i;
            this.config =_.extend(
                {
                    name: 'default',
                    label: 'default',
                    checked: false,
                    toggles: false,
                    disabled: false
                } ,opts);
            app.addImportLink(app.config.componentPrefix + '/paper-radio-button/paper-radio-button.html');
            //this._create();
            return this;
        },
        _create: function() {
            var i,
                element = document.createElement('paper-radio-button');
            element.name =this.config.name;
            element.label =this.config.label;
            element.toggles = this.config.checked;
            element.toggles = this.config.toggles;
            element.disabled = this.config.disabled;

            //container.appendChild(element);
            return element;
            //console.log(this);
            //console.log('create our first field');

        }
    };
    app.augment("radioButton", _radio, false);
})(parent.POLY.App);