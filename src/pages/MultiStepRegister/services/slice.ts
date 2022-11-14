import createAppSlice from '~/apis/common/slice';
import { ReduxState } from '~/apis/common/type';
import { Gender } from '~/dtos/Enums/Gender.enum';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
import { UpSertMemberDto } from '~/dtos/Members/UpSertMemberDto.model';
import { searchMember } from '~/pages/MultiStepRegister/services/index';

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
    fillForm: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  [
    {
      action: searchMember,
      onFullfilled: (stateData, action) => {
        return { ...action.payload.data, ...stateData };
      },
    },
  ],
);

const registerReducer = slice.reducer;
export const { fillForm } = slice.actions;
export default registerReducer;
