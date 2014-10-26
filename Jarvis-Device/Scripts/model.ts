class Tag {
    Name: string;
    constructor(name: string) {
        this.Name = name
    }
}

class Device {
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
        this.IdTags = "bulb,light".split(",")
            .map(t => new Tag(t));

        this.Properties = [];
        var property = new DeviceProperty();
        property.MutatorTags = "turn,switch,toggle".split(",").map(t=> new Tag(t));
        property.Value = "On";
    }

    get color() {
        return this._color;
    }

    get status() {
        return this.color == "green";
    }

    on() {
        this._color = "green";
    }

    off() {
        this._color = "black"
    }
}

interface Command {
    UserID: string;
    DeviceID: string;
    Action: string;
    CommandType: CommandType;
    Parameters: string[]
}

enum CommandType { Query, Act }