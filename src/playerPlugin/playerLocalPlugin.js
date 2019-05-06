import scriptLoader from "../lib/externalScriptLoader";

const applyPlugin = (configs) => {
  /* eslint-disable */
  const plugin = require("./customPlugin.js");
  let readFile = (file) => {
      let rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  let allText = rawFile.responseText;
                  let predefinedConfig = Object.assign(configs, {
                    jQuery: "1.7.2",
                    debug: true
                  })
                  let blob = new Blob([`var predefinedConfig=` + JSON.stringify(predefinedConfig) + allText], 
                  { type: "text/javascript" })
                  let url = window.URL.createObjectURL(blob)
                  window.pluginURL = url
              }
          }
      }
      rawFile.send(null);
  }
  readFile("./customPlugin.js")
  
  videojs("preview-player").ready(function() {
    this.CustomPlugin(Object.assign(configs, {
      jQuery: "1.7.2",
      debug: true
    }));
  });
  /* eslint-enable */
};

export default applyPlugin;