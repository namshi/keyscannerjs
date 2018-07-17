import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup';


export default {
    entry: './index.js',
    dest: './build/index.min.js',
    format: 'umd',
    moduleName: 'keyscanner',
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        babelrc(),
    ],
    sourceMap: false
  }