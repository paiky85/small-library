import asyncHandler from 'express-async-handler';
import { genreDetails, genreList } from '../services/genreService.js';

// List of all genres
export const genre_list = asyncHandler(async (req, res) => {
  const allGenres = await genreList();
  res.json({
    title: 'Genres',
    genreList: allGenres.rows,
  });
});

// Details of specific genre
export const genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, genreBooks] = await genreDetails(req.params.id);

  if (genre === null) {
    const err = new Error('Genre not found');
    err.status = 404;
    return next(err);
  }

  res.json({
    genre: genre.rows[0],
    genreBooks: genreBooks.rows,
  });
});
