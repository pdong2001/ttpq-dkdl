import { createSlice } from '@reduxjs/toolkit';
import { LoginDTO } from '~/apis/auth/type';
import { SliceCaseReducers } from '@reduxjs/toolkit/dist/createSlice';
import { createAsyncRequest } from '~/apis/common/action';
import API from '~/apis/constants';

type AuthState = {
  isLoggedIn: boolean;
  loginData?: LoginDTO;
};

const initialState: AuthState = {
  isLoggedIn: false,
  loginData: undefined,
};

type LoginRequestDTO = {
  username: string;
  password: string;
};

export const login = createAsyncRequest<LoginRequestDTO>('auth/login', {
  method: 'post',
  url: API.LOGIN,
});

const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>, string>({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.isLoggedIn = false;
      state.loginData && (state.loginData.Token = '');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
  },
});

const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export default authReducer;
