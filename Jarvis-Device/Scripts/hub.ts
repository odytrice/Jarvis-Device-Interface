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
        },
        OnCommand: function (command:Command) {
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

    respond: (response: Response) => void;

    $emit(name: string, ...args: any[]): ng.IAngularEvent;
    $on(name: string, listener: (event: ng.IAngularEvent, args: any) => any): Function;
} 