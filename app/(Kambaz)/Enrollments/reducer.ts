import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollCourse: (state, action) => {
      state.enrollments = [...state.enrollments, action.payload] as any;
    },
    unenrollCourse: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => enrollment._id !== action.payload
      );
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = 
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;