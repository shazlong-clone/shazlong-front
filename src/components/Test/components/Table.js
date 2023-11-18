import { createSearchParams, useNavigate } from 'react-router-dom';

const Table = ({ data, setSortBy, sortBy }) => {
  // react-outer utility hook to manage navigation
  const navigate = useNavigate();

  const handleSorting = (value) => {
    // Check if the new value is the active sortBy value
    const isActiveSort = value === sortBy;

    // Update sortBy in the React land
    setSortBy(isActiveSort ? '' : value);

    // Update sortBy in the URL land
    if (isActiveSort) {
      navigate({});
    } else {
      navigate({
        search: `?${createSearchParams({
          sortBy: value,
        })}`,
      });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSorting('username')}>Username</th>
          <th onClick={() => handleSorting('name')}>Name</th>
          <th onClick={() => handleSorting('website')}>website</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.username}>
              <td>{item.username}</td>
              <td>{item.name}</td>
              <td>{item.website}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
