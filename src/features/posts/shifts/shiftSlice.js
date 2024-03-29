import { createSlice } from "@reduxjs/toolkit";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

const initialState = {
  shifts: {},
  status: Statuses.Initial,
};

export const initialShiftState = initialState;

export const shiftSlice = createSlice({
  name: "shift",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createShift: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const numOfKeys = Object.keys(state.shifts).length;
      action.payload.tempId = numOfKeys + 1;
      state.shifts[numOfKeys + 1] = action.payload;
      state.status = Statuses.UpToDate;
    },
    editShift: (state, action) => {
      state.shifts[action.payload.tempId] = action.payload;
      state.status = Statuses.UpToDate;
    },
    deleteShift: (state, action) => {
      state.shifts.filter((shift) => shift.tempId !== action.payload);
    },
    resetShifts: (state, action) => {
      state.shifts = [];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const { createShift, deleteShift, resetShifts, editShift } =
  shiftSlice.actions;

export const selectShifts = (state) => Object.values(state.shifts.shifts);

export default shiftSlice.reducer;
