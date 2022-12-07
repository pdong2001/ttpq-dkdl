import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Switch, useHistory, useParams } from 'react-router-dom';
import { ROUTES, AppRoute } from './routes';
import { nanoid, unwrapResult } from '@reduxjs/toolkit';
import { useContext, useEffect } from 'react';
import { getRegisterPage } from './slices/registerPage';
import { useAppDispatch } from './hooks/reduxHook';
import { MessageContext } from './providers/message';

function App() {
  const { shortUri } = useParams<any>();
  const dispatch = useAppDispatch();
  const messageService = useContext(MessageContext);
  const history = useHistory();

  useEffect(() => {
    if (shortUri) {
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
          history.push('/not-found');
        });
    }
  }, [shortUri]);
  return (
    <Switch>
      {ROUTES.map((route) => (
        <AppRoute key={nanoid()} {...route} />
      ))}
    </Switch>
  );
}

export default App;
