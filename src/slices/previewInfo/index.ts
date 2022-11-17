import { createAsyncRequest } from '~/slices/common/action';
import createAppSlice from '~/slices/common/slice';
import { ReduxState } from '~/apis/common/type';

const initialState: ReduxState = {
  data: {},
};

export const previewInfoPage = createAsyncRequest<string>('previewInfo/get', {
  method: 'get',
});

const previewInfo = createAppSlice('preview', initialState, {
    /* non-async action */
    fillDataPreview: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  }, []);

const previewPage = previewInfo.reducer;
export const { fillDataPreview } = previewInfo.actions;
export default previewPage;
