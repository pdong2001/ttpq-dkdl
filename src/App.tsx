import { Switch } from 'react-router-dom';
import { ROUTES } from './routes';
import { AppRoute } from './routes';
import React from 'react';

function App() {
  return (
    <Switch>
      {ROUTES.map((route) => (
        <AppRoute {...route} />
      ))}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default App;
