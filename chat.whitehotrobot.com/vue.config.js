const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  devServer: {
    host: 'chat.whitehotrobot.com',
    allowedHosts: [
      '192.168.1.201,127.0.0.1'
    ],
	  port:8000,
    publicPath: '/',
  },
  publicPath: '/',
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap((opts) => {
        opts[0].filename = './index.php';
        return opts;
      });
    }
  }
}
