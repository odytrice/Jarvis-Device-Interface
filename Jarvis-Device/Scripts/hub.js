'use strict';
app.service('_hub', [
    '$rootScope', '_notify', function ($rootScope, _notify) {
        //Create Representation of the Server's Move Shape
        var conn = $.connection;
        $.connection.hub.url = 'http://jarvis-hackathon.azurewebsites.net/signalr';
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

        ///Bind Server Methods
        self.hello = function () {
            hub.server.hello();
        };

        return self;
    }]);
//# sourceMappingURL=hub.js.map
