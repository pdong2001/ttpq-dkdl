import createAppSlice from '~/apis/common/slice';
import { ReduxState, ResponseData } from '~/apis/common/type';
import { PayloadAction } from '@reduxjs/toolkit';
import { MemberResponseDto } from '~/types/Members/MemberResponse.dto';
import { register, searchMember } from '~/pages/MultiStepRegister/services/index';

const initialState: ReduxState<MemberResponseDto> = {
  data: {
    hoTen: '',
    soDienThoai: '',
    cccd: '',
  } as MemberResponseDto,
};

const slide = createAppSlice<typeof initialState, ResponseData<MemberResponseDto>>(
  'register',
  initialState,
  {
    /* non-async action */
    /* ở đây vừa tạo ra reducer vừa tạo ra action với type là sliceName/fillForm */
    /* khi dùng action fillForm thì mình sẽ dispatch(fillForm(payload))*/
    fillForm: (state, action: PayloadAction<MemberResponseDto>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  [
    {
      /* ở đây mình dùng dispatch(register(payload)) ạ */
      action: register,
      onFullfilled: (_, action) => {
        // default: state.data = action.payload;
        /*TODO: handle success response*/
        return action.payload.data;
      },
      onRejected: (_, action) => {
        // default: state.error = action.payload;
        /*TODO: do other logic when reject */
        return action.payload;
      },
    },
    {
      action: searchMember,
      onFullfilled: (state, action) => {
        return { ...action.payload.data, ...state.data };
      },
    },
  ],
);

const registerReducer = slide.reducer;
export const { fillForm } = slide.actions; // các action được defined ở trong reducers sẽ get ra ở đây ạ
export default registerReducer;
