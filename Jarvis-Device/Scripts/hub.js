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
            },
            OnCommand: function (command) {
                $rootScope.$apply(function () {
                    self.$emit("new-command", command);
                });
            }
        });

        //Start Connection
        self.start = conn.hub.start().done(function () {
            self.initialize = function (devices) {
                hub.server.init(devices);
            };
            self.respond = function (resp) {
                hub.server.OnCommandCompleted(resp);
            };
        });

        return self;
    }]);
//# sourceMappingURL=hub.js.map
