const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: function(config, env) {
      if (!config.plugins) {
          config.plugins = [];
      }

      config.plugins.push(
          new CopyWebpackPlugin([{from: 'src/playerPlugin/customPlugin.js'}])
      );

      return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      let config = configFunction(proxy, allowedHost);
      
      // Do something to the dev config
      
      // Return your customised Webpack Development Server config.
      return config;
    };
  }
}