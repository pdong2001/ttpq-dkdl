import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css?inline';

/* ionic */
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css?inline';
// import '@ionic/react/css/float-elements.css?inline';
// import '@ionic/react/css/text-alignment.css?inline';
// import '@ionic/react/css/text-transformation.css?inline';
// import '@ionic/react/css/flex-utils.css?inline';
// import '@ionic/react/css/display.css?inline';

import 'primereact/resources/themes/saga-orange/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import { Switch, useHistory, useLocation, useParams } from 'react-router-dom';

import { ROUTES, AppRoute } from './routes';
import { nanoid, unwrapResult } from '@reduxjs/toolkit';
import { useContext, useEffect } from 'react';
import { getRegisterPage } from './slices/registerPage';
import { useAppDispatch } from './hooks/reduxHook';
import { MessageContext } from './providers/message';
import { setupIonicReact } from '@ionic/react';

setupIonicReact();

function App() {
  const { shortUri, eventId } = useParams<any>();
  const dispatch = useAppDispatch();
  const messageService = useContext(MessageContext);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (shortUri && !eventId) {
      dispatch(getRegisterPage({ shortUri }))
        .then(unwrapResult)
        .then(({ data }) => {
          const { start, end } = data;
          const today = new Date();
          const isTimeup = new Date(start) > today || today > new Date(end);
          if (new Date(start) > today) {
            messageService.add({
              description: 'Trang đăng ký chưa mở',
              status: 'error',
            });
          }
          if (today > new Date(end)) {
            messageService.add({
              description: 'Trang đăng ký đã hết hạn',
              status: 'error',
            });
          }
          if (isTimeup) {
            history.push('/');
          }
        })
        .catch(() => {
          if (shortUri != 'register-info') {
            const redirectUrl = pathname.replace('/' + shortUri, '');
            history.replace(redirectUrl);
            history.go(0);
          }
        });
    }
  }, [shortUri, eventId]);
  return (
    <Switch>
      {ROUTES.map((route) => (
        <AppRoute key={nanoid()} {...route} />
      ))}
    </Switch>
  );
}

export default App;
