"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, action.payload] as any;  // ✅ FIX: Use state.assignments
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(  // ✅ FIX: Use state.assignments
        (a: any) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((a: any) =>  // ✅ FIX: Use state.assignments
        a._id === action.payload._id ? action.payload : a
      ) as any;
    },
  },
});

export const {
  setAssignments,  // ✅ ADD: Export setAssignments
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;