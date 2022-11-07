import registerReducer from '~/pages/MultiStepRegister/services/slice';
import authReducer from '~/apis/auth/slice';
import requestReducer from '~/apis/request/slice';
import loadingReducer from '~/components/Loading/slice';

const rootReducer = {
  register: registerReducer,
  auth: authReducer,
  response: requestReducer,
  loading: loadingReducer,
};

export default rootReducer;
