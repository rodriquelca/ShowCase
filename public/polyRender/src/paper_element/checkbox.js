(function(app) {

    //var _field = {};

    //<core-label horizontal layout>
    //    <paper-checkbox for></paper-checkbox>
    //    <div vertical layout>
    //        <h4>Notifications</h4>
    //        <div>Notify me about updates to apps or games that I've downloaded</div>
    //    </div>
    //</core-label>

    var _checkbox = {
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
            app.addImportLink(app.config.componentPrefix + '/paper-checkbox/paper-checkbox.html');
            //this._create();
            return this;
        },
        _create: function() {
            var i,
                element = document.createElement('paper-checkbox'),
                container;
            element.name =this.config.name;
            container = document.querySelector(app.$rootEl.selector);

            layout = document.createElement('core-label');
            //layout.horizontal= true;
            var att = document.createAttribute("horizontal");
            layout.setAttributeNode(att)
            var att = document.createAttribute("layout");
            layout.setAttributeNode(att)
            layout.appendChild(element);

            labeldiv = document.createElement('span');

            //var att = document.createAttribute("vertical");
            //labeldiv.setAttributeNode(att);
            //var att = document.createAttribute("layout");
            //labeldiv.setAttributeNode(att)
            if (this.config.label) {
                labeldiv.innerHTML = this.config.label;
                layout.appendChild(labeldiv);
            }


            //element.label =this.config.label;
            //element.toggles = this.config.checked;
            //element.toggles = this.config.toggles;
            //element.disabled = this.config.disabled;

            //container.appendChild(layout);
            return layout;
            //console.log(this);
            //console.log('create our first field');

        }
    };
    app.augment("checkbox", _checkbox, false);
})(parent.POLY.App);