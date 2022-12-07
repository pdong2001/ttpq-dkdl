import { stat } from 'fs';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginPopup from '~/components/LoginPopup';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import {
  AuthMember,
  getLoggedInMember,
  getLoggedInRegister,
  logout as logoutMember,
} from '~/slices/memberAuth';
import { MessageContext } from '../message';

export type AuthValue = {
  login: () => void;
  logout: () => void;
  member: AuthMember;
};
export const AuthContext = createContext<AuthValue>({
  login: () => {
    return;
  },
  logout: () => {
    return;
  },
  member: {},
});

const { Provider } = AuthContext;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const memberLoggedIn = useAppSelector((state) => state.memberAuth.data);
  const [member, setMember] = useState(memberLoggedIn);
  const messageService = useContext(MessageContext);
  const { eventId } = useAppSelector((state) => state.registerPage.data);
  useEffect(() => {
    if (memberLoggedIn.userToken) {
      dispatch(getLoggedInMember({}));

      if (eventId) {
        dispatch(
          getLoggedInRegister({
            eventId: eventId || '',
          }),
        );
      }
    }
  }, [eventId]);
  useEffect(() => {
    setMember(memberLoggedIn);
  }, [memberLoggedIn]);

  const login = () => {
    setOpenLogin(true);
  };
  const reload = () => {
    history.go(0);
  };
  const logout = () => {
    dispatch(logoutMember({}));
    reload();
  };
  const onSuccess = () => {
    messageService.add({
      title: 'Đăng nhập thành công',
      status: 'success',
    });
    setOpenLogin(false);
    reload();
  };
  const onClose = () => {
    setOpenLogin(false);
  };
  const contextValue = {
    login,
    logout,
    member,
  };

  return (
    <Provider value={contextValue}>
      {children}
      <LoginPopup isOpen={openLogin} title='Đăng nhập' onSuccess={onSuccess} onClose={onClose} />
    </Provider>
  );
};

export default AuthProvider;
