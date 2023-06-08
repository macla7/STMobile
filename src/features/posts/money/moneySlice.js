import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  money: 0,
};

export const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    setMoney: (state, action) => {
      state.money = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setMoney } = moneySlice.actions;

export const selectMoney = (state) => {
  return state.money.money;
};

export default moneySlice.reducer;
