import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        {/* <p>
          Welcome to project of <em>Small Library</em>, a very basic React and
          Node js (Express) website developed as a demo project. Based on
          tutorial example on the Mozilla Developer Network.
        </p> */}
        <nav>
          <h1>Small Library</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="books">Books</NavLink>
          <NavLink to="authors">Authors</NavLink>
          <NavLink to="genres">Genres</NavLink>
          <NavLink to="copies">All Copies</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
