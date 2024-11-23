import asyncHandler from 'express-async-handler';
import { summaryInfo, bookList, bookDetails } from '../services/bookService.js';

// Summary info on homepage -----------------------------------------
export const index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await summaryInfo();

  res.json({
    bookCount: numBooks.rows[0].count,
    copiesCount: numBookInstances.rows[0].count,
    copiesAvailable: numAvailableBookInstances.rows[0].count,
    authorCount: numAuthors.rows[0].count,
    genreCount: numGenres.rows[0].count,
  });
});

// List of all books ------------------------------------------------
export const book_list = asyncHandler(async (req, res) => {
  const [allBooks, allAuthors, allGenres] = await bookList();

  res.json({
    title: 'Books',
    bookList: allBooks.rows,
    // authorList: allAuthors.rows,
    // genreList: allGenres.rows,
  });
});

// Details of specific book -----------------------------------------
export const book_detail = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await bookDetails(req.params.id);

  if (book === null) {
    // No results.
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }

  res.json({
    book: book.rows[0],
    copies: bookInstances.rows,
  });
});
