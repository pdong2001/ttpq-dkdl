import { ReduxState } from '~/apis/common/type';
import { createAsyncRequest } from '../common/action';
import createAppSlice from '../common/slice';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';

type RegisterInfoState = ReduxState;
const initialState: RegisterInfoState = {
  data: {},
};

export const getRegisterInfo = createAsyncRequest<EventRegistryDto>('registerInfo/get', {
  method: 'get',
});

const registerInfo = createAppSlice<RegisterInfoState>('register_info', initialState, {}, [
  {
    action: getRegisterInfo,
    onFullfilled: (_, action) => {
      return { ...action.payload.data };
    },
  },
]);

const registerInfoReducer = registerInfo.reducer;
export default registerInfoReducer;
