/// <reference path="typings/signalr/signalr.d.ts" />

app.controller("MainCtrl", function ($scope: ng.IScope, _hub: IHub, _notify: INotify) {

    var bulb = new Bulb();

    var switchBulb = function (b: Bulb) {
        if (b.status) {
            b.off();
        } else {
            b.on();
        }
    }

    _hub.start.done(function () {
        _notify.success("Connection Established");
        _hub.hello();
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