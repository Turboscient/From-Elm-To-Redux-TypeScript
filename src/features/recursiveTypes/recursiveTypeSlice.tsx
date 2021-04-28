import { createSlice } from '@reduxjs/toolkit';
import { Option, some, none, match, isSome } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

// https://gcanti.github.io/fp-ts/ *** Functional Programming in TypeScript ***
// https://github.com/gcanti/fp-ts

enum esrb_rating { NotRated, RatingPending, Everyone, Teen, Mature }
enum consoles { PC, Mobile, Xbox, Playstation, Nintendo }

type name = string;
type year = number;

type videogame_fields = name | year | boolean | esrb_rating | Array<consoles> | Option<videogame>

export interface videogame {
  name: name,
  yearReleased: year
  hasSinglePlayer: boolean,
  hasMultiPlayer: boolean,
  ratedByESRB: esrb_rating,
  runsOn: Array<consoles>,
  sequel: Option<videogame>
}

const superMarioBros2: videogame = {
  name: "Super Mario Bros. 2",
  yearReleased: 1988,
  hasSinglePlayer: true,
  hasMultiPlayer: false,
  ratedByESRB: esrb_rating.NotRated, 
  runsOn: [consoles.Nintendo],  
  sequel: none
};

const amongUs: videogame = {
  name: "Among Us",
  yearReleased: 2018,
  hasSinglePlayer: false,
  hasMultiPlayer: true,
  ratedByESRB: esrb_rating.Everyone, 
  runsOn: [consoles.Nintendo, consoles.PC, consoles.Mobile, consoles.Xbox],  
  sequel: none
};

const superMarioBros: videogame = {
  name: "Super Mario Bros.",
  yearReleased: 1985,
  hasSinglePlayer: true,
  hasMultiPlayer: false,
  ratedByESRB: esrb_rating.NotRated, 
  runsOn: [consoles.Nintendo],  
  sequel: some(superMarioBros2)
};

const getSequel = (state: videogame): videogame => {
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

export const displayGame = (game: videogame, field: videogame_fields): string => {  
  switch (field) {
    case "name": 
      return game.name;
    case "yearReleased": 
      return game.yearReleased.toString();
    case "hasSinglePlayer":     
      return game.hasSinglePlayer ? "True" : "False"
    case "hasMultiPlayer":     
      return game.hasMultiPlayer ? "True" : "False"
    case "ratedByESRB":
      return esrb_rating[game.ratedByESRB];
    case "runsOn":
      return "[" + game.runsOn.map((k) => ` ${consoles[k]}` ) + " ]";
    case "sequel":
      return isSome(game.sequel) ? getSequel(game).name : "None";
    default:
      return "";
  }
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