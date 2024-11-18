const BASE_API_URL = import.meta.env.VITE_REACT_BASE_API_URL;

export const summaryLoader = async () => {
  return await fetch(BASE_API_URL);
};

export const booksListLoader = async () => {
  return await fetch(BASE_API_URL + '/catalog/books');
};

export const bookDetailsLoader = async ({ params }) => {
  const { id } = params;
  return await fetch(BASE_API_URL + `/catalog/books/${id}`);
};
