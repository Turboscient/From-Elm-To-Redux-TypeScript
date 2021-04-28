import { useSelector, useDispatch } from 'react-redux';
import { isSome } from 'fp-ts/Option'
import { selectGame, goToSequel } from './recursiveTypeSlice';
import { esrb_rating, videogame, videogame_fields, consoles } from './RecursiveType'
import { getSequel } from './recursiveTypeSlice'


const displayGame = (game: videogame, field: videogame_fields): string => {  
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

export function RecursiveType() {
    const game = useSelector(selectGame);
    const dispatch = useDispatch();    
  
    return (
      <div>
        <div>          
          {Object.keys(game).map((k) => <div key={k}>{k}: {displayGame(game, k)}</div>)}        
          <button            
            aria-label="Decrement value"
            onClick={() => dispatch(goToSequel())}
          >
            <span>Go to sequel (if the game has one)</span>
          </button>   
        </div>        
      </div>
    );
  }
  