const { alias } = require("react-app-rewire-alias");

module.exports = function(config) {
    alias({
        "@Assets": "./src/assets",
        "@Bootstraps": "./src/bootstraps",
        "@Components": "./src/components",
        "@Configs": "./src/configs",
        "@Layouts": "./src/layouts",
        "@Modules": "./src/modules",
        "@Styles": "./src/styles",
        "@Utils": "./src/utils",
    })(config);

    return config;
}