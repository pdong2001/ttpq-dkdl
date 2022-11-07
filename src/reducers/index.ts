import registerReducer from '~/pages/MultiStepRegister/services/slice';
import authReducer from '~/apis/auth/slice';
import loadingReducer from '~/components/Loading/slice';

const rootReducer = {
  register: registerReducer,
  auth: authReducer,
  loading: loadingReducer,
};

export default rootReducer;
