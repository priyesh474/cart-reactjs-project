import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset, incrementByAmount } from '../slice/counter/counterSlice';

const Counter = () => {

    const [amount,setAmount] = useState(0)

    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    function incrementCount() {
        dispatch(increment())
    }

    function decrementCount() {
        dispatch(decrement())
    }
    
    function handleReset() {
        dispatch(reset())
    }

    function incAmount() {
        dispatch(incrementByAmount(amount))
    }

  return (
    <div>

        <button onClick={incrementCount}>+</button>
        <h2>{count}</h2>
        <button onClick={decrementCount}>-</button>
        <hr />
        <button onClick={handleReset}>reset</button>
        <hr />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        <button onClick={incAmount}>Increment by Amount</button>

    </div>
  )
}

export default Counter