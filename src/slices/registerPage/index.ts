import { createAsyncRequest } from '~/slices/common/action';
import createAppSlice from '~/slices/common/slice';
import { ReduxState } from '~/apis/common/type';
import { EventRegistryPageDto } from '~/dtos/EventRegistryPages/EventRegistryPageDto.model';
import API from '~/apis/constants';

type RegisterPageState = ReduxState<EventRegistryPageDto>;
const initialState: RegisterPageState = {
  data: {},
};

export const getRegisterPage = createAsyncRequest<{ shortUri: string }>('registerPage/get', {
  method: 'get',
  url: API.GET_REGISTER_PAGE,
});

const registerPage = createAppSlice<RegisterPageState>('auth', initialState, {}, [
  {
    //@ts-ignore
    action: getRegisterPage,
    onFullfilled: (_, action) => {
      return { ...action.payload.data };
    },
  },
]);

const registerPageReducer = registerPage.reducer;
export default registerPageReducer;
