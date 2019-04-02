// dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';

// containers
import App from '../app/containers/App';

// HTML
import html from './html';

export default function serverRender() {
  return (req, res, next) => {
    const markup = renderToString(<App />);
    res.send(html({
      markup
    }));
  };
}
