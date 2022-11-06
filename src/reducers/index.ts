import registerReducer from '~/pages/MultiStepRegister/redux/slice';
import authReducer from '~/apis/auth/slice';
import requestReducer from '~/apis/request/slice';

const rootReducer = { register: registerReducer, auth: authReducer, response: requestReducer };

export default rootReducer;
