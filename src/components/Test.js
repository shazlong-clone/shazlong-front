import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const BuggyCounter = () => {
  const [state, setState] = useState(0);
  const handleClick = () => {
   setState(state + 1)
  };
  if (state === 5) {
    // Simulate a JS error
    throw new Error('I crashed!');
  }
  return <h1 onClick={handleClick}>{state}</h1>;
};

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br />
          <br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a
          JavaScript error in a component.
        </b>
      </p>
      <hr />
        <p>
          These two counters are inside the same error boundary. If one crashes,
          the error boundary will replace both of them.
        </p>
        <BuggyCounter />
        <BuggyCounter />
      <hr />
      <p>
        These two counters are each inside of their own error boundary. So if
        one crashes, the other is not affected.
      </p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}
export default App;
