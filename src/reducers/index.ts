import registerReducer from '~/slices/register';
import loadingReducer from '~/components/Loading/slice';
import memberAuthReducer from '~/slices/memberAuth';
import registerPageReducer from '~/slices/registerPage';
import registerInfoReducer from '~/slices/registerInfo';

const rootReducer = {
  register: registerReducer,
  loading: loadingReducer,
  registerPage: registerPageReducer,
  registerInfo: registerInfoReducer,
  memberAuth: memberAuthReducer,
};

export default rootReducer;
