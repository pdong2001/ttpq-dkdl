import axios from 'axios';
import { stat } from 'fs';
import { get } from 'lodash';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '~/apis/constants';
import LoginPopup from '~/components/LoginPopup';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import {
  AuthMember,
  getLoggedInMember,
  getLoggedInRegister,
  logout as logoutMember,
} from '~/slices/memberAuth';
import { formatUrl } from '~/utils/functions';
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

export const arrEventId = ['1'];

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { shortUri } = useParams<any>();
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

  useEffect(() => {
    // check arrived
    if (arrEventId.includes(shortUri)) {
      if (!memberLoggedIn?.userToken) {
        login();
      } else {
        dispatch(
          getLoggedInRegister({
            eventId: shortUri || '',
          }),
        ).then((item) => {
          const id = get(item, 'payload.data.id');
          if (id) {
            console.log('🚀 ~ file: index.tsx:76 ~ ).then ~ id', id);
            axios
              .post(
                process.env.TTPQ_BASE_URL + formatUrl(API.POST_ARRIVED, { eventId: id }),
                {},
                {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: 'Bearer ' + memberLoggedIn?.userToken,
                  },
                },
              )
              .then(({ data }) => {
                console.log(data);
              });
            //check api
            history.push(`SitbWFs/register-info/${id}`);
          }
        });
      }
    }
  }, []);

  const loadCheckArrived = async () => {};

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
      <LoginPopup
        isOpen={openLogin}
        title='Đăng nhập'
        onSuccess={onSuccess}
        onClose={onClose}
        isLogin
      />
    </Provider>
  );
};

export default AuthProvider;
