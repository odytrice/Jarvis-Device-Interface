/// <reference path="typings/signalr/signalr.d.ts" />
app.controller("MainCtrl", function ($scope, _hub, _notify) {
    var bulb = new Bulb();

    var switchBulb = function (b) {
        if (b.status) {
            b.off();
        } else {
            b.on();
        }
    };

    _hub.start.done(function () {
        _notify.success("Connection Established");
        _hub.initialize([bulb]);
    });

    _hub.start.fail(function (err) {
        _notify.error(err);
        console.log(err);
    });

    angular.extend($scope, {
        bulb: bulb,
        switchBulb: switchBulb
    });
});
//# sourceMappingURL=controller.js.map
