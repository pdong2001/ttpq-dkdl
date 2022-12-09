import React, { useContext, useState } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { RouteType } from '.';
import BlankLayout from '~/components/containers/layouts/BlankLayout';
import { AuthContext } from '~/providers/auth';
import LoginPopup from '~/components/LoginPopup';
import { Box, useHighlight } from '@chakra-ui/react';

export const AppRoute = ({
  component: Component,
  path,
  exact,
  layout: Layout = BlankLayout,
  needAuth = false,
  strict,
  sensitive,
  ...rest
}: RouteType) => {
  const { member } = useContext(AuthContext);
  const [isOpenLogin, setIsOpenLogin] = useState(true);
  const onCloseLogin = () => {
    setIsOpenLogin(false);
  };
  const history = useHistory();
  const { pathname } = useLocation();
  const handleLoginSuccess = () => {
    history.push(pathname);
    history.go(0);
  };

  if (!needAuth || member.userToken) {
    return (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        sensitive={sensitive}
        {...rest}
        render={() => (
          <Layout>
            <Component />
          </Layout>
        )}
      />
    );
  }
  return (
    <Route
      path={path}
      exact={exact}
      strict={strict}
      sensitive={sensitive}
      {...rest}
      render={() => (
        <Layout>
          <LoginPopup
            isOpen={isOpenLogin}
            onClose={onCloseLogin}
            onSuccess={handleLoginSuccess}
            title='Mời bạn đăng nhập'
            isLogin
          />
          <Box minH='100vh'></Box>
        </Layout>
      )}
    />
  );
};
