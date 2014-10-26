'use strict';

app.service('_hub', ['$rootScope', '_notify', function ($rootScope: ng.IRootScopeService, _notify: INotify) {
    //Create Representation of the Server's Move Shape
    var conn: any = $.connection;
    $.connection.hub.url = 'http://jarvis-hackathon.azurewebsites.net/signalr';
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

    ///Bind Server Methods
    self.hello = function () {
        hub.server.hello();
    }

    return self;
}]);


interface IHub {
    /**
    * Asynchronously Starts the Connection to the Hub
    */
    start: JQueryPromise<any>;

    /**
    * Says Hello
    */
    hello: () => void;

    $emit(name: string, ...args: any[]): ng.IAngularEvent;
    $on(name: string, listener: (event: ng.IAngularEvent, args: any) => any): Function;
} 