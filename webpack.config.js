/**
 * Created by 27353 on 2017/6/14.
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:"./app/entry.js",
    output:{
        path:__dirname+"/dist",
        filename:"bundle.js"
    },
    resolve:{
      alias:{
          ol:"./openlayers/dist/ol.debug.js",  ///debug模式
          'vue$':'vue/dist/vue.common.js'
      }

    },
    module: {
        rules: [{
            test: /\.css$/,

            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ]
}