const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3008,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'http://localhost:3008/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader:
          'babel-loader',
        options: {
          presets: [
            '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
            '@babel/preset-react',
          ], // to compile react to ES5
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      library: { type: 'var', name: 'container' },
      remotes: {
        // Test if by declaring things like this: “app2@http://localhost:3002/remoteEntry.js”,
        // means that you no longer have to declare it in index.html
        auth: 'auth',
        books: 'books',
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
