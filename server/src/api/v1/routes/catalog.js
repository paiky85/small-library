import express from 'express';
const router = express.Router();

// Require controller modules.

import * as book_controller from '../controllers/bookController.js';
import * as author_controller from '../controllers/authorController.js';
import * as genre_controller from '../controllers/genreController.js';
import * as book_instance_controller from '../controllers/bookinstanceController.js';

//
//////////////////
///  HOMEPAGE  ///
//////////////////
//

// GET catalog home page summary.
router.get('/', book_controller.index);

//
///////////////////
/// BOOK ROUTES ///
///////////////////
//

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

// GET request for one Book.
router.get('/books/:id', book_controller.book_detail);

/*
// POST request for creating Book.
router.post('/books', book_controller.book_create);

// DELETE request to delete Book.
router.delete('/books/:id/', book_controller.book_delete);

// PATCH request to update Book.
router.patch('/books/:id/', book_controller.book_update);

*/
//
/////////////////////
/// AUTHOR ROUTES ///
/////////////////////
//

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);

// GET request for one Author.
router.get('/authors/:id', author_controller.author_detail);

// POST request for creating Author.
router.post('/authors', author_controller.author_create);

// DELETE request to delete Author.
router.delete('/authors/:id/', author_controller.author_delete);

// PATCH request to update Author.
router.patch('/authors/:id/', author_controller.author_update);

//
////////////////////
/// GENRE ROUTES ///
////////////////////
//

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

// GET request for one Genre.
router.get('/genres/:id', genre_controller.genre_detail);

/*
//POST request for creating Genre.
router.post('/genres', genre_controller.genre_create);

// DELETE request to delete Genre.
// router.delete('/genres/:id', genre_controller.genre_delete);
router.delete('/genres/', genre_controller.genre_delete);

// PATCH request to update Genre.
router.patch('/genres/:id/', genre_controller.genre_update);


*/
//
///////////////////////////
/// BOOKINSTANCE ROUTES ///
///////////////////////////
//
/*
// POST request for creating BookInstance.
router.post('/copies', book_instance_controller.bookinstance_create);

// DELETE request to delete BookInstance.
router.delete('/copies/:id/', book_instance_controller.bookinstance_delete);

// PATCH request to update BookInstance.
router.patch('/copies/:id/', book_instance_controller.bookinstance_update);

// GET request for one BookInstance.
router.get('/copies/:id', book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/copies', book_instance_controller.bookinstance_list);
*/
export default router;
