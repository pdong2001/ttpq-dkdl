import createAppSlice from '~/apis/common/slice';
import { APIStatus, ResponseData } from '~/apis/common/type';
import { createAsyncRequest } from '~/apis/common/action';
import API from '~/apis/constants';
import { PayloadAction } from '@reduxjs/toolkit';

export type RegisterRequestDTO = {
  // id?: string;
  hoTen: string;
  soDienThoai: string;
  cccd: string;
  registerType: string;
};

export type RegisterResponseDTO = {
  id?: string;
  name: string;
  phone: string;
  citizenId: string;
  registerType: string;
  roleInGroup: string;
  citizenIdOfLeader: string;
  buddhistName: string;
  dateOfBirth: string;
  email: string;
  permanentAddress: string;
  temporaryAddress: string;
  youthAssociation: string;
  groupOfYouthAssociation: string;
  departLocation: string;
  timeToStart: string;
  timeToReturn: string;
  numberOfServing: string;
  skill: string;
  experienceDept: number;
  aspirationDept: number;
  receiveCardLocation: number;
  avatar: string;
  note: string;
};

const initialState: ResponseData<RegisterResponseDTO> = {
  status: APIStatus.IDLE,
  data: undefined,
  error: undefined,
};

export const register = createAsyncRequest<RegisterRequestDTO>(
  'register',
  {
    method: 'post',
    url: API.REGISTER,
  },
  (response) => response.data.data,
);

const slide = createAppSlice<typeof initialState>(
  'register',
  initialState,
  {
    /* non-async action */
    /* ở đây vừa tạo ra reducer vừa tạo ra action với type là sliceName/fillForm */
    /* khi dùng action fillForm thì mình sẽ dispatch(fillForm(payload))*/
    fillForm: (state, action: PayloadAction<RegisterResponseDTO>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  [
    {
      /* ở đây mình dùng dispatch(register(payload)) ạ */
      action: register,
      onFullfilled: (state, action) => {
        // default: state.data = action.payload;
        /*TODO: handle success response*/
        state.data = action.payload;
      },
      onRejected: (state, action) => {
        // default: state.error = action.payload;
        /*TODO: do other logic when reject */
        console.error(action.payload, state);
      },
    },
  ],
);

const registerReducer = slide.reducer;
export const { fillForm } = slide.actions; // các action được defined ở trong reducers sẽ get ra ở đây ạ
export default registerReducer;
