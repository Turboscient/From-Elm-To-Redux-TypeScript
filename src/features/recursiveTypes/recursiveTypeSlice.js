import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
};

export const recursiveTypeSlice = createSlice({
    name: 'videogame',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      increment: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },      
    },    
  });

export const { increment, decrement } = recursiveTypeSlice.actions;
export const selectCount = (state) => state.videogame.value;

export default recursiveTypeSlice.reducer;