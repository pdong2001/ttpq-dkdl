import { LoginDTO } from '~/apis/auth/type';
import { createAsyncRequest } from '~/apis/common/action';
import API from '~/apis/constants';
import { ReduxState } from '~/apis/common/type';
import createAppSlice from '../common/slice';

type AuthData = {
  isLoggedIn: boolean;
  loginData?: LoginDTO;
};

type AuthState = ReduxState<AuthData>;
const initialState: AuthState = {
  data: { isLoggedIn: false, loginData: undefined },
};

type LoginRequestDTO = {
  username: string;
  password: string;
};

export const login = createAsyncRequest<LoginRequestDTO>('auth/login', {
  method: 'post',
  url: API.LOGIN,
});

const authSlice = createAppSlice<AuthState>(
  'auth',
  initialState,
  {
    logout: (state) => {
      state.data.isLoggedIn = false;
      state.data.loginData && (state.data.loginData.Token = '');
    },
  },
  [
    {
      action: login,
      onFullfilled: (_, action) => {
        return { ...action.payload.data };
      },
    },
  ],
);

const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export default authReducer;
