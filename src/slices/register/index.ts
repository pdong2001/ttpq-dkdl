import { UpSertEventRegistryDto } from './../../dtos/EventRegistries/UpSertEventRegistryDto.model';
import createAppSlice from '~/slices/common/slice';
import { ReduxState } from '~/apis/common/type';
import { UpSertMemberDto } from '~/dtos/Members/UpSertMemberDto.model';
import API from '~/apis/constants';
import { MemberDto } from '~/dtos/Members/MemberDto.model';
import { createAsyncRequest } from '~/slices/common/action';

export const register = createAsyncRequest('register', {
  method: 'post',
  url: API.REGISTER,
});

export const updateRegister = createAsyncRequest<UpSertEventRegistryDto>('register/update', {
  method: 'put',
});
/* Khi HD tạo 1 service (action) cần tạo thêm 1 handler (reducer) ở trong slice */
export const searchMember = createAsyncRequest('searchMember', {
  method: 'post',
  url: API.SEARCH_MEMBER,
});
export const updateMember = createAsyncRequest('member/update', {
  method: 'post',
});

type Data = MemberDto & UpSertMemberDto;

const initialState: ReduxState<Data> = {
  data: {
    fullName: '',
    identityCard: '',
    phoneNumber: '',
    register: {},
  },
};

const slice = createAppSlice<typeof initialState>(
  'register',
  initialState,
  {
    /* non-async action */
    fillForm: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    onlyKeep: (state, action) => {
      state.data = { ...action.payload };
    },
  },
  [
    {
      action: searchMember,
      onFullfilled: (stateData, action) => {
        return { ...action.payload.data, ...stateData };
      },
    },
    {
      //@ts-ignore
      action: register,
      onFullfilled: (_, action) => {
        return action.payload.data;
      },
      onRejected: (_, action) => {
        return action.payload;
      },
    },
    {
      action: updateRegister,
      onFullfilled: (_, action) => {
        return action.payload.data;
      },
    },
  ],
);

const registerReducer = slice.reducer;
export const { fillForm, onlyKeep } = slice.actions;
export default registerReducer;
