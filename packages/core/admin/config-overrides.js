module.exports = {
    webpack: function(config, env) {
        config.module.rules[1].oneOf[2].include = undefined;
        return config;
    }
};
