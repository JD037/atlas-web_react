const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // Set mode to development to enable dev specific features
  entry: {
    header: './modules/header/header.js', // Entry point for the header module
    body: './modules/body/body.js',       // Entry point for the body module
    footer: './modules/footer/footer.js'  // Entry point for the footer module
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public') // Bundles are output to the public directory
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serving static files from public
    },
    compress: true,  // Enable gzip compression for everything served
    port: 8564,      // Server runs on port 8564
    open: true       // Automatically open the browser when server starts
  },
  module: {
    rules: [
      {
        test: /\.css$/,                       // Apply rules for CSS files
        use: ['style-loader', 'css-loader']   // Use style-loader and css-loader for CSS files
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),                // Clean the output directory before build
    new HtmlWebpackPlugin({                  // Simplifies creation of HTML files to serve webpack bundles
      title: 'Webpack Project',
      template: path.join(__dirname, 'src', 'index.html') // Path to the template file
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'  // Enables splitting of all types of chunks
    }
  },
  devtool: 'inline-source-map' // Source maps support for development mode
};
