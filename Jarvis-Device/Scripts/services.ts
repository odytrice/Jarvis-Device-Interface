
app.service("_notify", function (): INotify {
    toastr.options['closeButton'] = true;

    function parse(message: string) {
        if (!message || message.length <= 0) {
            return " &nbsp; ";
        }
        return message;
    }
    return {
        success: function (message: string, title?: string) {
            toastr.success(parse(message), title);
        },
        error: function (message: string, title?: string) {
            toastr.error(parse(message), title);
        },
        info: function (message: string, title?: string) {
            toastr.info(parse(message), title);
        },
        warning: function (message: string, title?: string) {
            toastr.warning(parse(message), title);
        },
        option: function (setting: string, value: any) {
            toastr.options[setting] = value;
        }
    };
});

interface INotify {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    option: (setting: string, value: any) => void;
} 