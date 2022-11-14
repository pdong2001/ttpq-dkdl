import { ReduxState } from '~/apis/common/type';
import { createAsyncRequest } from '../common/action';
import createAppSlice from '../common/slice';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';
import { register } from '~/pages/MultiStepRegister/services';

type RegisterInfoState = ReduxState<EventRegistryDto>;
const initialState: RegisterInfoState = {
  data: {},
};

export const getRegisterInfo = createAsyncRequest('registerInfo/get', {
  method: 'get',
});

const registerInfo = createAppSlice<RegisterInfoState>('register_info', initialState, {}, [
  {
    action: getRegisterInfo,
    onFullfilled: (_, action) => {
      return { ...action.payload.data };
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
]);

const registerInfoReducer = registerInfo.reducer;
export default registerInfoReducer;
