(function(app) {

    //var _field = {};

    var _checkboxgroup = {
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
                            name: 'uno',
                            checked: false,
                        },
                        {
                            label: 'dos',
                            name: 'dos',
                            checked: false,
                        }
                    ]

                } ,opts);
            //app.addImportLink(app.config.componentPrefix + '/paper-radio-group/paper-radio-group.html');
            this._create(opts);
        },
        _create: function() {
            var i,
                container = document.querySelector(app.$rootEl.selector),
                item,
                radio,
                label = document.createElement('h4');

            var element = document.createElement('section');

            if (this.config.label) {
                label.innerHTML = this.config.label;
                element.appendChild(label);
            }

            //element.selected =this.config.selected;
            //element.name =this.config.name;
            for (i = 0; i < this.config.options.length; i += 1) {
                item = this.config.options[i];
                check = app.checkbox.init(item);
                element.appendChild(check._create());

            }

            container.appendChild(element);
            console.log(this);
            console.log('create our first field');

        }
    };
    app.augment("checkGroup", _checkboxgroup, false);
})(parent.POLY.App);