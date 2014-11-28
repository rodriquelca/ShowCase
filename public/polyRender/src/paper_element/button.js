(function(app) {

    var _button = {
        init: function(opts) {
            var i;
            this.config =_.extend(
                {
                    label: 'default',
                    callback: null,
                    disabled: false
                } ,opts);
            app.addImportLink(app.config.componentPrefix + '/paper-button/paper-button.html');
            this._create();
        },
        _create: function() {
            var i,
                container = document.querySelector(app.$rootEl.selector);

            var div  =  document.createElement('div');
            var btn = document.createElement('paper-button');
            //input.label =this.config.label;
            var att = document.createAttribute("raised");
            btn.setAttributeNode(att);

            var att = document.createAttribute("class");
            att.value= "colored";
            btn.setAttributeNode(att);
            //click event
            if(this.config.callback) {
                var att = document.createAttribute("onclick");
                //att.value= "javascript:" +this.config.callback ;
                att.value= 'javascrpt:'+ this.config.callback;
                btn.setAttributeNode(att);
            }


            btn.innerHTML =  this.config.label;

            div.appendChild(btn);
            container.appendChild(div);

        }
    };
    app.augment("button", _button, false);
})(POLY.App);