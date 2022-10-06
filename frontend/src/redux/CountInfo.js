import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "countInfo",
  initialState: {
    count:0,
    total:0,
    gugunList:[], // {gugun: string, count: int, total: int}
    catList:[] //
  },
  reducers: {
    SET_COUNT:(state, action) =>{
      state.count = action.payload;
    },
    SET_TOTAL:(state, action) =>{
      state.total = action.payload;
    },
    SET_GUGUNLIST:(state, action) =>{
      state.gugunList = action.payload;
    },
    SET_CATLIST:(state, action) =>{
      state.catList = action.payload;
    }
  },
});

export const { SET_COUNT, SET_TOTAL, SET_GUGUNLIST, SET_CATLIST } =
  tokenSlice.actions;

export default tokenSlice.reducer;
