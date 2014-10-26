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

    _hub.$on("new-command", function (e, a) {
        if (a.DeviceID == bulb.Id) {
            if (a.CommandType == 1 /* Act */) {
                for (var i = 0; i < a.Parameters.length; i++) {
                    bulb[a.Parameters[i]](a.Action);
                }
            }
            if (a.CommandType == 0 /* Query */) {
                for (var i = 0; i < a.Parameters.length; i++) {
                    var value = bulb[a.Parameters[i]]();
                    var response = new Response();
                    response.CommandType = a.CommandType;
                    response.DeviceID = a.DeviceID;
                    response.Message = "";
                    response.Properties = [];
                    response.Properties.push({ Name: a.Parameters[i], Value: value });
                    _hub.respond(response);
                }
            }
        }
    });

    angular.extend($scope, {
        bulb: bulb,
        switchBulb: switchBulb
    });
});
//# sourceMappingURL=controller.js.map
