import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,    
  selectGame,
  displayGame
} from './recursiveTypeSlice';

export function RecursiveType() {
    const game = useSelector(selectGame);
    const dispatch = useDispatch();   

    
  
    return (
      <div>
        <div>
          <button            
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          {Object.keys(game).map((k) => <div key={k}>{k}: {displayGame(game, k)}</div>)}
          {console.log(game)}
          <button            
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>        
      </div>
    );
  }
  