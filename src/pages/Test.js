import React, { memo, useEffect, useMemo } from 'react';
const Comp1 = memo(({ obj }) => {
  console.log('rendered Comp1');
  return <h1>{obj.name}</h1>;
});
function Test() {
  const [counter, setCounter] = React.useState(0);
  const { arr } = { arr: [{ name: 'name' }] };
  const arrStr = JSON.stringify(arr);
  const memorizedDoctors = useMemo(() => arr, [arrStr]);
  useEffect(() => {
    console.log('arr');
  }, []);
  console.log('rendered');

  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
      {counter}
      {memorizedDoctors?.map((item, index) => {
        return <Comp1 key={index} obj={item} />;
      })}
    </div>
  );
}

export default Test;
