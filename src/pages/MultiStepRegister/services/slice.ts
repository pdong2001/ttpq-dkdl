import createAppSlice from '~/apis/common/slice';
import { ReduxState } from '~/apis/common/type';
import { Gender } from '~/dtos/Enums/Gender.enum';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
import { UpSertMemberDto } from '~/dtos/Members/UpSertMemberDto.model';
import { register, searchMember } from '~/pages/MultiStepRegister/services/index';

const initialState: ReduxState<UpSertMemberDto> = {
  data: {
    email: '',
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
    /* ở đây vừa tạo ra reducer vừa tạo ra action với type là sliceName/fillForm */
    /* khi dùng action fillForm thì mình sẽ dispatch(fillForm(payload))*/
    // fillForm: (state, action: PayloadAction<MemberResponseDto>) => {
    fillForm: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  [
    {
      /* ở đây mình dùng dispatch(register(payload)) ạ */
      //@ts-ignore
      action: register,
      onFullfilled: (_, action) => {
        // default: state.data = action.payload;
        /*TODO: handle success response*/
        console.log('onFullfilled', action.payload);

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
      onFullfilled: (stateData, action) => {
        return { ...action.payload.data, ...stateData };
      },
    },
  ],
);

const registerReducer = slice.reducer;
export const { fillForm } = slice.actions; // các action được defined ở trong reducers sẽ get ra ở đây ạ
export default registerReducer;
