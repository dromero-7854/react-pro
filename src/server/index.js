// dependencies
import express from 'express';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

// API
import api from './api';

// webpack configuration
import webpackConfig from '../../webpack.config';

// express app
const app = express();
const compiler = webpack(webpackConfig);
const port = process.env.NODE_PORT || 3000;

// public static
app.use(express.static(path.join(__dirname, '../../public')));

// api middleware
app.use('/api', api);

// hot module replacement
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

// listening port
app.listen(port, err => {
  if (!err) {
    open(`http://localhost:${port}`);
  }
});
