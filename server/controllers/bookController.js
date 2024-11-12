import db from '../config/pg.js';

export const index = async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    db.query('SELECT COUNT (*) FROM book'),
    db.query('SELECT COUNT (*) FROM bookinstance'),
    db.query(`SELECT COUNT (*) FROM bookinstance WHERE status='Available'`),
    db.query('SELECT COUNT (*) FROM author'),
    db.query('SELECT COUNT (*) FROM genre'),
  ]);

  res.json({
    bookCount: numBooks.rows[0].count,
    copiesCount: numBookInstances.rows[0].count,
    copiesAvailable: numAvailableBookInstances.rows[0].count,
    authorCount: numAuthors.rows[0].count,
    genreCount: numGenres.rows[0].count,
  });
};
