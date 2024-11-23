import asyncHandler from 'express-async-handler';
import db from '../database/pg.js';

export const genreList = asyncHandler(
  async () => await db.query('SELECT * FROM genre ORDER BY name ASC')
);

export const genreDetails = asyncHandler(
  async id =>
    await Promise.all([
      db.query('SELECT * FROM genre WHERE id=$1', [id]),
      db.query('SELECT * FROM book WHERE genre_id=$1', [id]),
    ])
);
