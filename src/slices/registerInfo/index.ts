import { createAsyncRequest } from '~/slices/common/action';
import createAppSlice from '~/slices/common/slice';
import { ReduxState } from '~/apis/common/type';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';

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
]);

const registerInfoReducer = registerInfo.reducer;
export default registerInfoReducer;
