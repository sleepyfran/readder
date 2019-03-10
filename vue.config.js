const path = require('path')

module.exports = {
    publicPath: '',
    chainWebpack: config => {
        config.resolve.alias
            .set('@assets', path.resolve(__dirname, 'src/assets'))
            .set('@data', path.resolve(__dirname, 'src/data'))
            .set('@infrastructure', path.resolve(__dirname, 'src/infrastructure'))
            .set('@view', path.resolve(__dirname, 'src/view'))
            .set('@vuex', path.resolve(__dirname, 'src/vuex'))
    }
}
