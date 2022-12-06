import { ReduxState } from '~/apis/common/type';
import { MemberLoginRequest } from '~/dtos/Members/MemberLoginRequest.model';
import createAppSlice from '~/slices/common/slice';
import { createAsyncRequest } from '~/slices/common/action';
import { MemberDto } from '~/dtos/Members/MemberDto.model';
import API from '~/apis/constants';

const userPhone = sessionStorage.getItem('userPhone');
const userIDCard = sessionStorage.getItem('userIDCard');
const userToken = sessionStorage.getItem('userToken');

export type AuthMember = MemberDto & {
  userPhone?: string | null;
  userIDCard?: string | null;
  userToken?: string | null;
};

type MemberAuthState = ReduxState<AuthMember>;
const initialState: MemberAuthState = {
  data: {
    userPhone,
    userIDCard,
    userToken,
  },
};

export const getMemberAuth = createAsyncRequest<MemberLoginRequest>('memberAuth/get', {
  method: 'post',
});

export const getLoggedInMember = createAsyncRequest<void>('member/get', {
  method: 'get',
  url: API.GET_LOGGEDIN_MEMBER,
});

const memberAuth = createAppSlice<MemberAuthState>(
  'member_authen',
  initialState,
  {
    logout: (state) => {
      state.data = {};
      sessionStorage.removeItem('userToken');
    },
  },
  [
    {
      action: getMemberAuth,
      onFullfilled: (_, action) => {
        sessionStorage.setItem('userPhone', action.meta.arg?.data.phoneNumber);
        sessionStorage.setItem('userIDCard', action.meta.arg?.data.identityCard);
        sessionStorage.setItem('userToken', action.payload.data.token);
        return { ...action.payload.data, ...action.meta.arg?.data };
      },
    },
    {
      action: getLoggedInMember,
      onFullfilled: (state, action) => {
        return { ...state, ...action.payload.data };
      },
    },
  ],
);
const memberAuthReducer = memberAuth.reducer;

export const { logout } = memberAuth.actions;
export default memberAuthReducer;
