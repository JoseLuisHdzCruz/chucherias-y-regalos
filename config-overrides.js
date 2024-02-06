const webpack = require("webpack");

module.exports = function override(config, env) {
  // Agrega configuraciones específicas de Webpack aquí
  config.resolve = {
    ...config.resolve,
    fallback: {
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/")
    }
  };
  
  return config;
};
