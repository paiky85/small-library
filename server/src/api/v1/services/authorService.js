import asyncHandler from 'express-async-handler';
import db from '../database/pg.js';

// Database query for list of all authors
export const authorsList = asyncHandler(
  async () => await db.query('SELECT * FROM author ORDER BY family_name ASC')
);

// Database query for specific author by id
export const authorDetails = asyncHandler(
  async id =>
    await Promise.all([
      db.query('SELECT * FROM author WHERE id=$1', [id]),
      db.query('SELECT * FROM book WHERE author_id=$1', [id]),
    ])
);

// Add new author into database and return new saved record
export const addAuthor = asyncHandler(
  async ({ firstName, familyName, dateOfBirth, dateOfDeath }) => {
    const sql = `
    INSERT INTO author(first_name,family_name,date_of_birth,date_of_death) VALUES ($1,$2,$3,$4) RETURNING *
    `;

    return await db.query(sql, [
      firstName,
      familyName,
      dateOfBirth,
      dateOfDeath,
    ]);
  }
);

// Delete specific author from database by ID and return deleted record
export const deleteAuthor = asyncHandler(
  async id => await db.query('DELETE from author WHERE id=$1 RETURNING *', [id])
);

// Search specific author in database by author name
export const searchAuthor = asyncHandler(
  async ({ firstName, familyName, dateOfBirth, dateOfDeath }) => {
    const sql = `
    SELECT * FROM author WHERE 
    LOWER(first_name)=LOWER($1) AND LOWER(family_name)=LOWER($2) 
    AND coalesce(date_of_birth, '') = $3 AND coalesce(date_of_death, '') = $4
    `;
    return await db.query(sql, [
      firstName,
      familyName,
      dateOfBirth,
      dateOfDeath,
    ]);
  }
);

// Update specific author in database
export const updateAuthor = asyncHandler(async (id, newData) => {
  // Create array of author properties names with updated data
  const keyNames = Object.keys(newData);
  // Convert names from CamelCase to snake_case format to match database \n
  // names and create part of SQL query with SET keyword
  let setString = 'SET ';
  keyNames.map((variableName, i) => {
    const columnName = variableName
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .toLowerCase(); // <-- Convert CamelCase to snake_case name variable
    // Create part of SQL query string with SET keyword
    setString += `${columnName} = '${newData[variableName]}'${
      i < keyNames.length - 1 ? ', ' : ''
    }`;
  });
  // Update author propeties
  const sql = `UPDATE author ${setString} WHERE id=$1 RETURNING *`;
  return await db.query(sql, [id]);
});
