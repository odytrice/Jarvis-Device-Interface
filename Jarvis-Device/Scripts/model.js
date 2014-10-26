var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tag = (function () {
    function Tag(name) {
        this.Name = name;
    }
    return Tag;
})();

var Device = (function () {
    function Device() {
    }
    return Device;
})();

var DevicePropertyType;
(function (DevicePropertyType) {
    DevicePropertyType[DevicePropertyType["Continuous"] = 0] = "Continuous";
    DevicePropertyType[DevicePropertyType["Discrete"] = 1] = "Discrete";
})(DevicePropertyType || (DevicePropertyType = {}));

var DeviceProperty = (function () {
    function DeviceProperty() {
    }
    return DeviceProperty;
})();

var Bulb = (function (_super) {
    __extends(Bulb, _super);
    function Bulb() {
        _super.call(this);
        this.off();
        this.Id = "1";
        this.IdTags = "bulb,light".split(",").map(function (t) {
            return new Tag(t);
        });

        this.Properties = [];
        var property = new DeviceProperty();
        property.MutatorTags = "turn,switch,toggle".split(",").map(function (t) {
            return new Tag(t);
        });
        property.Value = "On";

        this.Properties.push(property);

        var property = new DeviceProperty();
        property.MutatorTags = "turn,switch,toggle".split(",").map(function (t) {
            return new Tag(t);
        });
        property.Value = "Off";
        this.Properties.push(property);
    }
    Object.defineProperty(Bulb.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Bulb.prototype, "status", {
        get: function () {
            return this.color == "#000";
        },
        enumerable: true,
        configurable: true
    });

    Bulb.prototype.on = function () {
        this._color = "#000";
    };

    Bulb.prototype.off = function () {
        this._color = "#bbb";
    };
    return Bulb;
})(Device);

var Response = (function () {
    function Response() {
    }
    return Response;
})();

var CommandType;
(function (CommandType) {
    CommandType[CommandType["Query"] = 0] = "Query";
    CommandType[CommandType["Act"] = 1] = "Act";
})(CommandType || (CommandType = {}));
//# sourceMappingURL=model.js.map
