import createAppSlice from '~/apis/common/slice';
import { APIStatus, ResponseData } from '~/apis/common/type';
import { createAsyncRequest } from '~/apis/common/action';
import API from '~/apis/constants';
import { PayloadAction } from '@reduxjs/toolkit';

type RegisterDTO = {
  id?: string;
  name: string;
  phone: string;
  citizenId: string;
  registerType: string;
};

const initialState: ResponseData<RegisterDTO> = {
  status: APIStatus.IDLE,
  data: undefined,
};

export const register = createAsyncRequest<RegisterDTO>('register', {
  method: 'post',
  url: API.REGISTER,
});

const slide = createAppSlice<typeof initialState>(
  'register',
  initialState,
  {
    /* non-async action */
    /* ở đây vừa tạo ra reducer vừa tạo ra action với type là sliceName/fillForm */
    /* khi dùng action fillForm thì mình sẽ dispatch(fillForm(payload))*/
    fillForm: (state, action: PayloadAction<RegisterDTO>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  [
    {
      /* ở đây mình dùng dispatch(register(payload)) ạ */
      action: register,
      onFullfilled: (state, action) => {
        /*TODO: handle success response*/
        state.data = action.payload; // just example
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
