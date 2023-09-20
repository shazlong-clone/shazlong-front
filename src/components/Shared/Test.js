import { useEffect, useState } from 'react';

const Parent = () => {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    setInterval(function () {
      setTime(Date.now());
    }, 1000);
  }, []);
  
  return (
    <div>
      <article>{time}</article>
      <a
        href="/ddd"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        link
      </a>
    </div>
  );
};

export default Parent;
