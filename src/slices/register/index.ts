import { UpSertEventRegistryDto } from './../../dtos/EventRegistries/UpSertEventRegistryDto.model';
import createAppSlice from '~/slices/common/slice';
import { ReduxState } from '~/apis/common/type';
import { Gender } from '~/dtos/Enums/Gender.enum';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
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

type Data = MemberDto & UpSertMemberDto;

const initialState: ReduxState<Data> = {
  data: {
    fullName: '',
    gender: Gender.MALE,
    identityCard: '',
    phoneNumber: '',
    register: {
      registerType: RegisterType.SINGLE,
    },
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
export const { fillForm } = slice.actions;
export default registerReducer;
