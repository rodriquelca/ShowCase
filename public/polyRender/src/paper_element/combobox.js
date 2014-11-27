(function(app) {

    //var _field = {};

    var _combobox = {
        init: function(opts) {
            var i;
            this.config =_.extend(
                {
                    label: 'default',
                    floatingLabel: false,
                    disabled: false,
                    options: []
                } ,opts);
            app.addImportLink(app.config.componentPrefix + '/paper-dropdown-menu/paper-dropdown-menu.html');
            app.addImportLink(app.config.componentPrefix + '/paper-dropdown/paper-dropdown.html');
            app.addImportLink(app.config.componentPrefix + '/core-menu/core-menu.html');
            app.addImportLink(app.config.componentPrefix + '/paper-item/paper-item.html');
            this._create();
        },
        _create: function() {
            var i,
                container = document.querySelector(app.$rootEl.selector);
            //space = document.createElement('br');
            //container.appendChild(space);
            var section =  document.createElement('section');
            var element = document.createElement('paper-dropdown-menu');

            var drop = document.createElement('paper-dropdown');
            drop.className = 'dropdown';
            var menu = document.createElement('core-menu');
            menu.className = "menu";


            for (i = 0; i < this.config.options.length; i += 1) {
                var item = document.createElement('paper-item');
                item.innerHTML = this.config.options[i].label;
                menu.appendChild(item);

            }


            drop.appendChild(menu);
            element.appendChild(drop);
            section.appendChild(element);
            container.appendChild(section);

            console.log(this);
            console.log('create our first field');

        }
    };
    app.augment("combobox", _combobox, false);
})(POLY.App);