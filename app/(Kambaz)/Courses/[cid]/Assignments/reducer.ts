"use client";
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../Database"; // ✅ adjust path if needed (relative to this file)

const initialState =  db.assignments || [];
const assignmentsSlice = createSlice({
name: "assignments",
initialState,
reducers: {
addAssignment: (state, action) => {
state.push(action.payload);
},
deleteAssignment: (state, action) => {
return state.filter((a) => a._id !== action.payload);
},
updateAssignment: (state, action) => {
const index = state.findIndex((a) => a._id === action.payload._id);
if (index !== -1) {
state[index] = action.payload;
}
},
},
});



export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
