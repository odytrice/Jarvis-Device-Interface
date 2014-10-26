'use strict';
app.service('_hub', [
    '$rootScope', '_notify', function ($rootScope, _notify) {
        //Create Representation of the Server's Move Shape
        var conn = $.connection;
        $.connection.hub.url = 'http://localhost:13094/signalr';
        var hub = conn.controlHub;

        var self = $rootScope.$new();

        var state = {
            Items: []
        };

        //Make Client Side Methods Available for Server
        $.extend(hub.client, {
            Initialize: function (serverstate) {
                $rootScope.$apply(function () {
                });
            },
            Hello: function () {
                $rootScope.$apply(function () {
                    console.log("Hello World!!");
                });
            }
        });

        //Start Connection
        self.start = conn.hub.start();

        self.initialize = function (devices) {
            hub.server.init(devices).done(function () {
                console.log("Yes!!");
            }).fail(function (e) {
                _notify.error(e);
            });
        };

        return self;
    }]);
//# sourceMappingURL=hub.js.map
