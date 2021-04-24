import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,  
  selectCount,
} from './recursiveTypeSlice';

export function RecursiveType() {
    const count = useSelector(selectCount);
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
          <span>{count}</span>
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
  