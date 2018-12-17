var tailwindcss = require('tailwindcss');
const purgecss = require('postcss-purgecss');
const glob = require('glob-all')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || []
  }
}

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./tailwind.js'),
    require('autoprefixer')
    // This will work in a pinch, 
    // , purgecss({
    //   content: ['./source/**/*.html', './source/**/*.erb'],
    //   extractors: [{
    //     extractor: TailwindExtractor,
    //     extensions: ['html', 'js', 'erb']
    //   }]
    // })

  ]
}