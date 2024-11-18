import { useLoaderData } from 'react-router-dom';
import { ItemsList } from '../../components/ItemsList';

export default function Book() {
  const { title, bookList } = useLoaderData();
  return <ItemsList headerName={title} data={bookList} />;
}
