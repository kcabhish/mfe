// This allows to merge different webpack configs
const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const port = 8082;
const devConfig = {
  mode: 'development',
  devServer: {
    port,
    historyApiFallback: true,
  },
  output: {
    publicPath: `http://localhost:${port}/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// Prioritizes configs right to left on the parameters
module.exports = merge(commonConfig, devConfig);
