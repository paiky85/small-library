import { Link } from 'react-router-dom';

function Item({ item }) {
  return (
    <p>
      <Link to={item.id.toString()}>
        <strong>{item.title}</strong>
      </Link>
      {` (${item.family_name}, ${item.first_name})`}
    </p>
  );
}

export function ItemsList({ headerName, data }) {
  return (
    <div>
      <h2>List of all {headerName.toLowerCase()}</h2>
      {data.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
