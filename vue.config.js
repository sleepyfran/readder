const path = require('path')

module.exports = {
    publicPath: '',
    chainWebpack: config => {
        config.resolve.alias
            .set('@assets', path.resolve(__dirname, 'src/assets'))
            .set('@common', path.resolve(__dirname, 'src/common'))
            .set('@data', path.resolve(__dirname, 'src/data'))
            .set('@infrastructure', path.resolve(__dirname, 'src/infrastructure'))
            .set('@view', path.resolve(__dirname, 'src/view'))
            .set('@store', path.resolve(__dirname, 'src/store'))
            .set('@services', path.resolve(__dirname, 'src/services'))
    }
}
