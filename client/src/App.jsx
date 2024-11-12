import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import BookLayout from './layouts/BookLayout';
import AuthorLayout from './layouts/AuthorLayout';
import GenreLayout from './layouts/GenreLayout';
import BookInstanceLayout from './layouts/BookInstanceLayout';

// Pages
import Home from './pages/Home';

// Loaders
import { summaryLoader } from './utils/loaders';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} loader={summaryLoader} />
        <Route path="books" element={<BookLayout />} />
        <Route path="authors" element={<AuthorLayout />} />
        <Route path="genres" element={<GenreLayout />} />
        <Route path="copies" element={<BookInstanceLayout />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
