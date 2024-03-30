import { Table } from 'rsuite';

const { Cell } = Table;

const CustomCell = ({ rowData, dataKey, ...props }) => {
  return <Cell {...props}>{rowData[dataKey] ?? props.render(rowData)}</Cell>;
};

export default CustomCell;
