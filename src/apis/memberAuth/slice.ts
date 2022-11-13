import { ReduxState } from '~/apis/common/type';
import { createAsyncRequest } from '../common/action';
import createAppSlice from '../common/slice';
import { MemberLoginRequest } from '~/dtos/Members/MemberLoginRequest.model';

const userPhone = sessionStorage.getItem('userPhone') ? sessionStorage.getItem('userPhone') : null;
const userIDCard = sessionStorage.getItem('userIDCard') ? sessionStorage.getItem('userIDCard') : null;
const userToken = sessionStorage.getItem('userToken') ? sessionStorage.getItem('userToken') : null;

type MemberAuthState = ReduxState;
const initialState: MemberAuthState = {
  data: {
    userPhone,
    userIDCard,
    userToken
  },
};

export const getMemberAuth = createAsyncRequest<MemberLoginRequest>('memberAuth/get', {
  method: 'post',
});

const memberAuth = createAppSlice<MemberAuthState>('member_authen', initialState, {}, [
  {
    action: getMemberAuth,
    onFullfilled: (_, action) => {
      sessionStorage.setItem("userPhone", action.meta.arg?.data.phoneNumber);
      sessionStorage.setItem("userIDCard", action.meta.arg?.data.identityCard);
      sessionStorage.setItem("userToken", action.payload.data.token);
      return { ...action.payload.data, ...action.meta.arg?.data  };
    },
  },
]);

const memberAuthReducer = memberAuth.reducer;
export default memberAuthReducer;
