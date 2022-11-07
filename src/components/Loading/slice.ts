import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isLoading: false },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = loadingSlice.actions;
const loadingReducer = loadingSlice.reducer;
export default loadingReducer;
