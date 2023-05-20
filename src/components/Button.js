import React from 'react';

function Button({ type, children }) {
  return (
    <div>
      {type === 'gohst' ? (
        <button className='border rounded-lg border-cyan/90 hover:border-cyan bg-white text-cyan/90 hover:text-cyan transition-all'>
          {children}
        </button>
      ) : (
        <button className='bg-cyan/90 hover:bg-cyan transition-all text-white rounded-lg'>
          {children}
        </button>
      )}
    </div>
  );
}

export default Button;
