const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
        options: {
<<<<<<< HEAD
          presets: ['@babel/preset-env', '@babel/preset-react'],
=======
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
        resolve: {
          extensions: ['.jsx', '.js'],
>>>>>>> 55d5893603ad3770eef3ff64252153a99bbcec9a
        },
      },
      {
        test: /\.css$/,
        loader: "css-loader"
      }
    ],
  },
};
