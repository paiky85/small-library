import asyncHandler from 'express-async-handler';
import {
  addAuthor,
  authorDetails,
  authorsList,
  deleteAuthor,
  searchAuthor,
  updateAuthor,
} from '../services/authorService.js';

// LIST of all Authors ----------------------------------------------
export const author_list = asyncHandler(async (req, res) => {
  const allAuthors = await authorsList();

  if (allAuthors.rows.length) {
    const err = new Error('No authors in database');
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ title: 'Authors', authorList: allAuthors.rows });
});

// DETAILS of specific author ---------------------------------------
export const author_detail = asyncHandler(async (req, res, next) => {
  const [author, authorBooks] = await authorDetails(req.params.id);

  if (author.rows.length) {
    const err = new Error('Author not found');
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({
    title: 'Details',
    author: author.rows[0],
    authorBooks: authorBooks.rows,
  });
});

// ADD new author ---------------------------------------------------
export const author_create = asyncHandler(async (req, res) => {
  // Search if author already exist in DB
  const authorExists = await searchAuthor(req.body);
  // If author exist, return author details else create new record in DB
  if (Array.isArray(authorExists.rows) && authorExists.rows.length) {
    // Author exists, return its details
    res.status(409).json(authorExists.rows[0]);
  } else {
    // New author saved
    const newAuthor = await addAuthor(req.body);
    res.status(200).json(newAuthor.rows);
  }
});

// DELETE author ----------------------------------------------------
export const author_delete = asyncHandler(async (req, res, next) => {
  const deletedAuthor = await deleteAuthor(req.params.id);

  if (deletedAuthor.rows.length) {
    const err = new Error('Author not found');
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json(deletedAuthor.rows);
});

// UPDATE author ----------------------------------------------------
export const author_update = asyncHandler(async (req, res, next) => {
  const updatedAuthor = await updateAuthor(req.params.id, req.body);

  if (updatedAuthor.rows.length) {
    const err = new Error('Author not found');
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json(updatedAuthor.rows);
});
