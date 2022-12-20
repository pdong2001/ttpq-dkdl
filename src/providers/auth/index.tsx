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

import publicRequest from '~/apis/common/axios';
import { unwrapResult } from '@reduxjs/toolkit';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';

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
  const { eventId: idEvent } = useParams<any>();
  const [openLogin, setOpenLogin] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { shortUri } = useParams<any>();
  const memberLoggedIn = useAppSelector((state) => state.memberAuth.data);
  const registerInfo = useAppSelector((state) => state.registerInfo.data);
  const [member, setMember] = useState(memberLoggedIn);
  const messageService = useContext(MessageContext);
  const { eventId } = useAppSelector((state) => state.registerPage.data);

  useEffect(() => {
    if (!memberLoggedIn?.avatarPath && registerInfo?.member) {
      setMember({ ...member, ...registerInfo?.member });
    }
  }, [member.avatarPath, registerInfo?.member?.avatarPath]);

  const getRegister = () => {
    return dispatch(
      getLoggedInRegister({
        eventId: eventId || '',
      }),
    ).then(unwrapResult);
    // .then((data) => {
    //   console.log('data', data);
    // });
  };

  useEffect(() => {
    if (memberLoggedIn.userToken) {
      dispatch(getLoggedInMember({}));
      if (eventId) {
        getRegister();
      }
    }
  }, [eventId]);

  useEffect(() => {
    setMember(memberLoggedIn);
  }, [memberLoggedIn]);

  useEffect(() => {
    // check arrived

    if (idEvent) {
      if (!memberLoggedIn?.userToken) {
        login();
      } else {
        dispatch(
          getLoggedInRegister({
            eventId: idEvent || '',
          }),
        ).then((item) => {
          const id = get(item, 'payload.data.id');
          const isArrived = get(item, 'payload.data.isArrived');
          const eventRegistryPageId = get(item, 'payload.data.eventRegistryPageId');
          if (id && !isArrived) {
            publicRequest.post(formatUrl(API.POST_ARRIVED, { eventId: idEvent })).then((data) => {
              history.push(`/${eventRegistryPageId}/register-info/${id}`);
            });
          } else {
            history.push(`/${eventRegistryPageId}/register-info/${id}`);
          }
        });
      }
    }
  }, []);

  // const loadCheckArrived = async () => {};

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

    getRegister().then(({ data }) => {
      const { id, eventRegistryPageId = shortUri } = (data as EventRegistryDto) || {};
      if (id && eventRegistryPageId) {
        history.push(`/${eventRegistryPageId}/register-info/${data.id}`);
      }
    });
    setTimeout(() => {
      reload();
    }, 1000);
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
