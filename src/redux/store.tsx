import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tabSlice from "./tabSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    tabs: tabSlice,
  },
  // middleware: [thunk], // middleware automatically added in redux toolkit no need to mention
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
