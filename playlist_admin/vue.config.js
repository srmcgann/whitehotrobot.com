const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  devServer: {
    host: '192.168.1.201',
    allowedHosts: [
      '192.168.1.201,127.0.0.1,local.whitehotrobot.com'
    ],
	  port:8000,
  },
  publicPath: './',
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap((opts) => {
        opts[0].filename = './index.php';
        return opts;
      });
    }
  }
}
