import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabState = {
  activeTab: string;
};

const initialState: TabState = {
  activeTab: "status board",
};

const tabSlice = createSlice({
  name: "tabs",
  initialState: initialState,
  reducers: {
    changeActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { changeActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
