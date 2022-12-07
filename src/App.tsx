import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Switch } from 'react-router-dom';
import { ROUTES, AppRoute } from './routes';
import { nanoid } from '@reduxjs/toolkit';

function App() {
  return (
    <Switch>
      {ROUTES.map((route) => (
        <AppRoute key={nanoid()} {...route} />
      ))}
    </Switch>
  );
}

export default App;
