const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = [
  //{
  //  mode: 'development',
  //  entry: './src/electron.ts',
  //  target: 'electron-main',
  //  module: {
  //    rules: [
  //      {
  //        test: /\.tsx?$/,
  //        include: /src/,
  //        use: [{ loader: 'ts-loader' }],
  //      },
  //    ],
  //  },
  //  node: {
  //    __dirname: false
  //  },
  //  output: {
  //    path: __dirname + '/build',
  //    filename: 'electron.js',
  //  },
  //  resolve: {
  //    mainFiles: ['index'],
  //  },
  //},
  {
    mode: 'development',
    entry: './src/index.tsx',
    //target: 'electron-renderer',
    target: 'web',
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      hot: true,
      port: 8000,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
        {
          test: /\.s[ca]ss?$/,
          include: /src/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use : [
            'file-loader'
          ],
        }
      ],
    },
    output: {
      path: __dirname + '/build',
      filename: 'index.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
      mainFiles: ['index'],
      alias: {
        gt_components: path.resolve(__dirname, 'src/components'),
        gt_containers: path.resolve(__dirname, 'src/containers'),
        gt_utils: path.resolve(__dirname, 'src/utils'),
        gt_images: path.resolve(__dirname, 'src/images'),
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
  },
]
