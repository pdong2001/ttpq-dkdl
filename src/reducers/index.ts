import registerReducer from '~/pages/MultiStepRegister/services/slice';
import authReducer from '~/apis/auth/slice';
import loadingReducer from '~/components/Loading/slice';
import registerPageReducer from '~/apis/registerPage/slice';

const rootReducer = {
  register: registerReducer,
  auth: authReducer,
  loading: loadingReducer,
  registerPage: registerPageReducer,
};

export default rootReducer;
