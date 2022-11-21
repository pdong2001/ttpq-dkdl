import { Switch } from 'react-router-dom';
import { ROUTES } from './routes';
import { AppRoute } from './routes';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <Switch>
      {ROUTES.map((route) => (
        <AppRoute {...route} />
      ))}
    </Switch>
  );
}

export default App;
