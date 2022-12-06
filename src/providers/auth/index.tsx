import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LoginPopup from '~/components/LoginPopup';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { AuthMember, getLoggedInMember, logout as logoutMember } from '~/slices/memberAuth';

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

  useEffect(() => {
    if (memberLoggedIn.userToken) {
      dispatch(getLoggedInMember({}));
    }
  }, []);
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
