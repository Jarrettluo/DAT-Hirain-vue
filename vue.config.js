const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
          .set('@$', resolve('src'))
          .set('assets',resolve('src/assets'))
          .set('components',resolve('src/components'))
          .set('layout',resolve('src/layout'))
          .set('base',resolve('src/base'))
          .set('static',resolve('src/static'))
    },
    publicPath:'./',
    devServer: {
        port: 8080 // 端口号配置
    },
    configureWebpack: {
    externals: {
        'AMap': 'AMap' // 高德地图配置
    }
    }

}