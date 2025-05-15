// This allows to merge different webpack configs
const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const port = 8081;
const devConfig = {
  mode: 'development',
  devServer: {
    port:8081,
    historyApiFallback: true,
  },
  output: {
    publicPath: `http://localhost:8081/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// Prioritizes configs right to left on the parameters
module.exports = merge(commonConfig, devConfig);
