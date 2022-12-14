const rewireStyledComponents = require("react-app-rewire-styled-components");

/* config-overrides.js */
module.exports = function override(config, env) {
  if (env === "development") {
    config = rewireStyledComponents(config, env);
  }
  return config;
};
