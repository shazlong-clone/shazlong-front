import React, { useState } from 'react';

const hoc = (OriginalComponent) => {
    return () =>{
        const [counter, setCounter] = useState(25);
        const increaseCounter = () => {
            setCounter(counter + 1 );
        }
        return <OriginalComponent counter={counter} increateCounter={increaseCounter} />
    }
}

export default hoc;