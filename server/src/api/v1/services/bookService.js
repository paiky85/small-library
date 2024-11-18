import asyncHandler from 'express-async-handler';
import db from '../database/pg.js';

export const summaryInfo = asyncHandler(
  async () =>
    await Promise.all([
      db.query('SELECT COUNT (*) FROM book'),
      db.query('SELECT COUNT (*) FROM bookinstance'),
      db.query(`SELECT COUNT (*) FROM bookinstance WHERE status='Available'`),
      db.query('SELECT COUNT (*) FROM author'),
      db.query('SELECT COUNT (*) FROM genre'),
    ])
);

export const bookList = asyncHandler(
  async () =>
    await Promise.all([
      db.query(
        'SELECT book.id,book.title, author.family_name, author.first_name FROM book JOIN author ON book.author_id = author.id ORDER BY book.title ASC'
      ),
      db.query('SELECT * FROM author ORDER BY family_name ASC'),
      db.query('SELECT * FROM genre ORDER BY name ASC'),
    ])
);

export const bookDetail = asyncHandler(async id => {
  const sqlQueryString = `
  SELECT b.id, b.title, b.isbn, b.summary, a.first_name, a.family_name, a.id AS author_id, g.name AS genre_name, g.id AS genre_id 
  FROM book b 
  JOIN author a ON b.author_id=a.id 
  JOIN genre g ON b.genre_id = g.id
  WHERE b.id=$1
  `;

  return await Promise.all([
    db.query(sqlQueryString, [id]),
    db.query('SELECT * FROM bookinstance WHERE book_id=$1', [id]),
  ]);
});
