import createAsyncSlice from '~/apis/common/slice';
import { APIStatus } from '~/apis/common/type';
import { createAsyncRequest } from '~/apis/common/action';
import API from '~/apis/constants';

type RegisterResponse = {
  // các field trả về từ response của API
};

const initialState = {
  status: APIStatus.IDLE,
  data: {} as RegisterResponse,
};
type RegisterRequest = { name: string; phone: string; cccd: string };

export const register = createAsyncRequest<RegisterRequest>('register', {
  method: 'get',
  url: API.REGISTER,
});

const slide = createAsyncSlice<typeof initialState>(
  'register',
  initialState,
  {
    /* non-async action */
    test: (state, action) => {
      state.data = action.payload;
    },
  },
  [
    {
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
export const { test } = slide.actions;
export default registerReducer;
