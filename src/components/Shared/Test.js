import { useEffect, useState } from 'react';

const Parent = () => {
  const [time, setTime] = useState(Date.now());
  useEffect(()=>{
    console.log('inuse Effect')
  },[]);
  1
  2
  return (
    <div>
      {
        console.log('render')
      }
      <article>{time}</article>
      <a
        href="/ddd"
      >
        link
      </a>
    </div>
  );
};

export default Parent;
