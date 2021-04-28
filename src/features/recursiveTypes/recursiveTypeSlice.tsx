import { createSlice } from '@reduxjs/toolkit';
import { match } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { videogame } from './RecursiveType'
import { superMarioBros } from './VideoGames'

// https://gcanti.github.io/fp-ts/ *** Functional Programming in TypeScript ***
// https://github.com/gcanti/fp-ts

export const getSequel = (state: videogame): videogame => {
  return pipe(
          // Argument
          state.sequel,
          // Pattern match over Maybe type
          match(
            // Nothing
            () => state,
            // Some(...)
            (sequel) => sequel
          )
        )
}

const initialState: videogame = superMarioBros;

export const recursiveTypeSlice = createSlice({
    name: 'videogame',
    initialState,    
    reducers: {      
      goToSequel: (state) => {              
        return getSequel(state);       
      }
    },    
  });

export const { goToSequel } = recursiveTypeSlice.actions;
export const selectGame = (state: any): videogame => state.videogame;

export default recursiveTypeSlice.reducer;