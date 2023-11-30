import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer from './favouriteSlice';
// Import other reducers as needed

const store = configureStore({
  reducer: {
    favourite: favouriteReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;