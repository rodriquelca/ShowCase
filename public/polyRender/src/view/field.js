(function(app) {

    // Dictionary of alerts
    var _field = {};

    var _field = {
        init: function() {
            console.log('initiate fields');
        },
        _create: function(key, options) {
            //here create field
        }
    };
    app.augment("field", _field, false);
})(POLY.App);