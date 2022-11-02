const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  parallel:false,
  transpileDependencies: true,
  configureWebpack: {
    externals: 'hls.js',
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {}
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'tslint-loader'
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    },
  },
  // 反向代理
  devServer: {
    port: '8888',
    proxy: {
      '/works': {
        target: 'http://101.43.158.79:3000',
        changeOrigin: true
      },
      '/blogs': {
        target: 'http://101.43.158.79:3000',
        changeOrigin: true
      },
      '/login': {
        target: 'http://101.43.158.79:3000',
        changeOrigin: true
      }
    }
  },
  runtimeCompiler: true,
  lintOnSave: false,
})
