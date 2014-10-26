app.service("_notify", function () {
    toastr.options['closeButton'] = true;

    function parse(message) {
        if (!message || message.length <= 0) {
            return " &nbsp; ";
        }
        return message;
    }
    return {
        success: function (message, title) {
            toastr.success(parse(message), title);
        },
        error: function (message, title) {
            toastr.error(parse(message), title);
        },
        info: function (message, title) {
            toastr.info(parse(message), title);
        },
        warning: function (message, title) {
            toastr.warning(parse(message), title);
        },
        option: function (setting, value) {
            toastr.options[setting] = value;
        }
    };
});
//# sourceMappingURL=services.js.map
