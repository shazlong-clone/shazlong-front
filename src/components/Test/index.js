import React from 'react';
import { useEffect } from 'react';
import Table from './components/Table';
import { useSearchParams } from 'react-router-dom';
const App = () => {
  const [data, setData] = React.useState([]);
  const [sortBy, setSortBy] = React.useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const sortByQuery = searchParams.get('sortBy');

    setSortBy(sortByQuery);
  }, [searchParams]);

  const sortedData = sortBy
    ? [...data].sort((a, b) => {
        const firstValue = a[sortBy];
        const secondValue = b[sortBy];

        return firstValue && secondValue ? firstValue.localeCompare(secondValue) : 0;
      })
    : data;

  return (
    <div>
      <Table data={sortedData} sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
};

export default App;
