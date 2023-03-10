import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    name: 'simple-vue3',
    format: 'es'
  },
  plugins: [
    commonjs()
  ]
}
