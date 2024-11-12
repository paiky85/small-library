import { useLoaderData } from 'react-router-dom';

export default function Home() {
  const summary = useLoaderData();
  return (
    <div>
      <p>
        Welcome to project of <em>Small Library</em>, a very basic React and
        Node js (Express) website developed as a demo project. Based on tutorial
        example on the Mozilla Developer Network.
      </p>

      <p>The library has the following record counts:</p>
      <br />
      <ul>
        <li>
          <strong>Books: {summary.bookCount}</strong>
        </li>
        <li>
          <strong>Copies: {summary.copiesCount}</strong>
        </li>
        <li>
          <strong>Copies available: {summary.copiesAvailable}</strong>
        </li>
        <li>
          <strong>Authors: {summary.authorCount}</strong>
        </li>
        <li>
          <strong>Genres: {summary.genreCount}</strong>
        </li>
      </ul>
    </div>
  );
}
