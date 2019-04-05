import scriptLoader from "../lib/externalScriptLoader";

const applyPlugin = (configs) => {
  /* eslint-disable */
  const plugin = require("./customPlugin.js");
  videojs("preview-player").ready(function() {
    this.CustomPlugin(Object.assign(configs, {
      jQuery: "1.7.2",
      debug: true
    }));
  });
  /* eslint-enable */
};

export default applyPlugin;