import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {      
  selectGame,
  displayGame,
  goToSequel
} from './recursiveTypeSlice';

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
  