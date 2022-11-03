import requestReducer from '~/apis/request/reducer';
import { RequestData } from '~/apis/request/type';
export type State = {
  request: RequestData;
};
const rootReducer = { request: requestReducer };

export default rootReducer;
