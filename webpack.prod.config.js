const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')


// This class is used below to be used to match against tailwind classnames in the 
// files provided under paths: glob.sync....
// It ensures classes with special chars like -mt-1 and md:w-1/3 are included
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || []
  }
}

baseConfig.plugins.push(new PurgecssPlugin({
  paths: glob.sync(['./source/**/*.html', './source/**/*.erb']),
  extractors: [{
    extractor: TailwindExtractor,
    extensions: ['html', 'js', 'erb']
  }]
}));


prodConfig = {
  mode: "production",
  output: {
    path: path.join(__dirname, '.tmp/webpack_build')
  }
};

module.exports = merge(baseConfig, prodConfig);