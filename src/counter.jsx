import { useState } from "react";

export default function Counter() {

  const [count, setCount] = useState(0);

  const increment = (step) => {
    setCount(prev => prev + step)
  }

  const decrement = (step) => {
    setCount(prev => prev - step)
  }

  return (
    <>
      <p>Count : {count}</p>
      <div>
        <button onClick={() => increment(2)}>Increment</button>
        <button onClick={() => decrement(1)}
          disabled={count === 0}
        >Decrement</button>
        <button onClick={() => { setCount(0) }}>Reset</button>
      </div>
    </>
  )
}