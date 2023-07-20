import React from 'react';
import { InputPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map((item) => ({
  label: item,
  value: item,
}));
function App() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <InputPicker data={data} block />
      <InputPicker data={data} block />
    </div>
  );
}
export default App;
