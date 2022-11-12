import registerReducer from '~/pages/MultiStepRegister/services/slice';
import authReducer from '~/apis/auth/slice';
import loadingReducer from '~/components/Loading/slice';
import registerPageReducer from '~/apis/registerPage/slice';
import registerInfoReducer from '~/apis/registerInfo/slice';

const rootReducer = {
  register: registerReducer,
  auth: authReducer,
  loading: loadingReducer,
  registerPage: registerPageReducer,
  registerInfo: registerInfoReducer,
};

export default rootReducer;
