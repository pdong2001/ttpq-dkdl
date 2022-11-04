import createSlide from '~/apis/common/slice';
import { APIStatus, RequestData } from '~/apis/common/type';
import { login, register } from '~/pages/MultiStepRegister/redux/actions';

const initialState: RequestData = {
  status: APIStatus.IDLE,
  data: [],
};

const slide = createSlide('register', initialState, [
  {
    action: login,
    onFullfilled: (state, action) => {
      state.data = action.payload;
    },
    onRejected: (state, action) => {
      state.data = action.payload;
    },
  },
  {
    action: register,
    onFullfilled: (state) => {
      state.data.push('hello success');
    },
    onRejected: (state) => {
      state.data.push('hello error');
    },
  },
]);

const registerReducer = slide.reducer;
// export const { createRegister } = slide.actions;
export default registerReducer;
