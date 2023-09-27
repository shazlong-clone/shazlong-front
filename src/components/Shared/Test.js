import { forwardRef, useRef } from 'react';

const CustomButtom = forwardRef ((props, ref) =>{
  return <button onClick={()=> ref.current.focus()}>
    cliclk
  </button>
}) 
const Test = () => {
  const ref = useRef();
  return (
    <>
    <input ref={ref} />
    <CustomButtom ref={ref}>
      Focus on Input
    </CustomButtom>
    </>
  );
};


export default Test;
