import { videogame, consoles, esrb_rating } from './RecursiveType'
import { some, none } from 'fp-ts/Option'


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

export { superMarioBros, superMarioBros2, amongUs }