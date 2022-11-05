import registerReducer from '~/pages/MultiStepRegister/redux/slice';
import authReducer from '~/apis/auth/slice';

const rootReducer = { register: registerReducer, auth: authReducer };

export default rootReducer;
