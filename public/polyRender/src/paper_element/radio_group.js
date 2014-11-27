(function(app) {

    //var _field = {};

    var _radiogroup = {
        init: function(opts) {
            var i;
            this.config =_.extend(
                {
                    label: null,
                    selected: '',
                    name: 'name',
                    options: [
                        {
                            label: 'uno',
                            name: 'uno'
                        },
                        {
                            label: 'dos',
                            name: 'dos'
                        }
                    ]

                } ,opts);
            app.addImportLink(app.config.componentPrefix + '/paper-radio-group/paper-radio-group.html');
            this._create(opts);
        },
        _create: function() {
            var i,
                container = document.querySelector(app.$rootEl.selector),
                item,
                radio,
                label = document.createElement('h4');
            if (this.config.label) {
                label.innerHTML = this.config.label;
                container.appendChild(label);
            }

            var element = document.createElement('paper-radio-group');
            element.selected =this.config.selected;
            element.name =this.config.name;
            for (i = 0; i < this.config.options.length; i += 1) {
                item = this.config.options[i];
                radio = app.radioButton.init(item);
                element.appendChild(radio._create());

            }

            container.appendChild(element);
            console.log(this);
            console.log('create our first field');

        }
    };
    app.augment("radioGroup", _radiogroup, false);
})(POLY.App);