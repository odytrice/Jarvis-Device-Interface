class Tag {
    Name: string;
    constructor(name: string) {
        this.Name = name
    }
}

class Device {
    Id: string;
    Properties: DeviceProperty[];
    IdTags: Tag[]
}

enum DevicePropertyType { Continuous, Discrete }

class DeviceProperty {
    PropertyType: DevicePropertyType;
    Value: any;
    IdTags: Tag[];
    MutatorTags: Tag[];
    IsContinous: boolean;
    IsDiscrete: boolean;
}




class Bulb extends Device {
    private _color: string;

    constructor() {
        super();
        this.off();
        this.Id = "1";
        this.IdTags = "bulb,light".split(",")
            .map(t => new Tag(t));

        this.Properties = [];
        var property = new DeviceProperty();
        property.MutatorTags = "turn,switch,toggle".split(",").map(t=> new Tag(t));
        property.Value = "On";

        this.Properties.push(property);

        var property = new DeviceProperty();
        property.MutatorTags = "turn,switch,toggle".split(",").map(t=> new Tag(t));
        property.Value = "Off";
        this.Properties.push(property);
    }

    get color() {
        return this._color;
    }

    get status() {
        return this.color == "#000";
    }

    on() {
        this._color = "#000";
    }

    off() {
        this._color = "#bbb"
    }
}

interface Command {
    UserID: string;
    DeviceID: string;
    Action: string;
    CommandType: CommandType;
    Parameters: string[]
}

interface CommandProperty {
    Name: string;
    Value: any;
}

class Response {
    DeviceID: string;
    UserID: string;
    StatusCode: number;
    Message: string;
    Properties: CommandProperty[];
    CommandType: CommandType;
}

enum CommandType { Query, Act }