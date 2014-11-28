(function(app) {

    //var _field = {};

    var _input = {
        init: function(opts) {
            var i;
            this.config =_.extend(
                {
                    label: 'default',
                    floatingLabel: false,
                    disabled: false,
                    name:''
                } ,opts);
            app.addImportLink(app.config.componentPrefix + '/paper-input/paper-input.html');
            this._create();
        },
        _create: function() {
            var i,
                container = document.querySelector(app.$rootEl.selector);
                //space = document.createElement('br');

            //container.appendChild(space);
            var div  =  document.createElement('div');
            var att = document.createAttribute("ng-controller");
            att.value = 'AppCtrl';
            div.setAttributeNode(att);

            var input = document.createElement('paper-input');
            input.label =this.config.label;
            input.name =this.config.name;
            var att = document.createAttribute("ng-model");
            att.value = 'nombre';
            input.setAttributeNode(att);

            var att = document.createAttribute("poly-field-name");
            att.value = this.config.name;
            input.setAttributeNode(att);
            input.floatingLabel = this.config.floatingLabel;
            input.disabled = this.config.disabled;

            div.appendChild(input);
            container.appendChild(div);
            console.log(this);
            console.log('create our first field');

        }
    };
    app.augment("input", _input, false);
})(POLY.App);