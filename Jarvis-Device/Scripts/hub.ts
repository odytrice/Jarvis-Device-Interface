'use strict';

app.service('_hub', ['$rootScope', '_notify', function ($rootScope: ng.IRootScopeService, _notify: INotify) {
    //Create Representation of the Server's Move Shape
    var conn: any = $.connection;
    $.connection.hub.url = 'http://localhost:13094/signalr';
    var hub = conn.controlHub;

    var self: IHub = <IHub><any>$rootScope.$new();

    var state = {
        Items: []
    }

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
            console.log("Yes!!")
        }).fail(function (e) {
            _notify.error(e);
            });
    };

    return self;
}]);


interface IHub {
    /**
    * Asynchronously Starts the Connection to the Hub
    */
    start: JQueryPromise<any>;
    initialize: (devices: Device[]) => void;

    /**
    * Says Hello
    */
    hello: () => void;

    $emit(name: string, ...args: any[]): ng.IAngularEvent;
    $on(name: string, listener: (event: ng.IAngularEvent, args: any) => any): Function;
} 