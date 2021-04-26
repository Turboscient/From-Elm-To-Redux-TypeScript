import { createSlice } from '@reduxjs/toolkit';
import { Option, some, none, match, isSome } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

// https://gcanti.github.io/fp-ts/ *** Functional Programming in TypeScript ***
// https://github.com/gcanti/fp-ts

enum esrb_rating { NotRated, RatingPending, Everyone, Teen, Mature }
enum console { PC, Mobile, Xbox, Playstation, Nintendo }

type name = string;
type year = bigint;

type videogame_fields = name | year | boolean | boolean | esrb_rating | Array<console> | Option<videogame>

export interface videogame {
  name: name,
  yearReleased: year
  hasSinglePlayer: boolean,
  hasMultiPlayer: boolean,
  ratedByESRB: esrb_rating,
  runsOn: Array<console>,
  sequel: Option<videogame>
}

const superMarioBros2: videogame = {
  name: "Super Mario Bros. 2",
  yearReleased: BigInt(1988),
  hasSinglePlayer: true,
  hasMultiPlayer: false,
  ratedByESRB: esrb_rating.NotRated, 
  runsOn: [console.Nintendo],  
  sequel: none
};

const amongUs: videogame = {
  name: "Among Us",
  yearReleased: BigInt(2018),
  hasSinglePlayer: false,
  hasMultiPlayer: true,
  ratedByESRB: esrb_rating.Everyone, 
  runsOn: [console.Nintendo, console.PC, console.Mobile, console.Xbox],  
  sequel: none
};

const superMarioBros: videogame = {
  name: "Super Mario Bros.",
  yearReleased: BigInt(1985),
  hasSinglePlayer: true,
  hasMultiPlayer: false,
  ratedByESRB: esrb_rating.NotRated, 
  runsOn: [console.Nintendo],  
  sequel: some(superMarioBros2)
};

const getSequel = (state: videogame) => {
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

export const displayGame = (game: videogame, field: videogame_fields) => {  
  switch (field) {
    case "name": 
      return game.name;
    case "yearReleased": 
      return Number(game.yearReleased);
    case "hasSinglePlayer":     
      let sp_char_list = game.hasSinglePlayer.toString().split("")  
      return sp_char_list.map((k, i) => i === 0 ? k.toUpperCase() : k);
    case "hasMultiPlayer":     
      let mp_char_list = game.hasMultiPlayer.toString().split("")  
      return mp_char_list.map((k, i) => i === 0 ? k.toUpperCase() : k);
    case "ratedByESRB":
      return esrb_rating[game.ratedByESRB];
    case "runsOn":
      return "[" + game.runsOn.map((k) => ` ${console[k]}` ) + " ]";
    case "sequel":
      return isSome(game.sequel) ? getSequel(game).name : "None";
    default:
      return "";
  }
}

const initialState = amongUs;

export const recursiveTypeSlice = createSlice({
    name: 'videogame',
    initialState,    
    reducers: {
      increment: (state) => {        
        state.yearReleased += 1n;
      },
      decrement: (state) => {
        state.yearReleased -= 1n;
      },      
      goToSequel: (state) => {
        state = getSequel(state);
      }
    },    
  });

export const { increment, decrement } = recursiveTypeSlice.actions;
export const selectGame = (state: any) => state.videogame;

export default recursiveTypeSlice.reducer;