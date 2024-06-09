import { createSlice } from '@reduxjs/toolkit';
import { getTestById, getUserTest, getpsychoTests } from './testAction';
export const sharedSlice = createSlice({
  name: 'tests',
  initialState: {
    tests: [],
    test: {},
  },
  reducers: {
    updateTest: (state, action) => {
      const newQustion = state.test?.questions?.map((q) => {
        if (action?.payload?.question_id === q._id) {
          return { ...q, userAnswer: action?.payload?.answer_id };
        } else return q;
      });
      state.test.questions = newQustion;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getpsychoTests.fulfilled, (state, action) => {
      state.tests = action.payload?.data;
    });

    builder.addCase(getTestById.fulfilled, (state, action) => {
      state.test = action.payload?.data;
    });

    builder.addCase(getTestById.rejected, (state) => {
      state.test = {};
    });
  },
});

export const { updateTest } = sharedSlice.actions;
// Action creators are generated for each case reducer function

export default sharedSlice.reducer;
