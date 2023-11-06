/* eslint-disable max-len */
import express from 'express';
import BookController from '@src/controller/BookController';

const BookRouter = express.Router();


/**
 * @openapi
 * /book/create:
 *   post:
 *     tags:
 *       - Book
 *     summary: Create Book Record.
 *     description: API used to Create Book Record...
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book Record Created Successfully.
 *       409:
 *         description: This Book already Exist.
 */
BookRouter.post('/create', BookController.createBook);

/**
 * @openapi
 * /book/getAllBooks:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get All Books.
 *     description: API used to Get All Books...
 *     parameters:
 *       - in: query
 *         name: SearchString
 *         schema:
 *           $ref: '#/components/schemas/SearchString'
 *       - in: query
 *         name: PageSize
 *         schema:
 *           $ref: '#/components/schemas/PageSize'
 *         default: 20
 *       - in: query
 *         name: PageNumber
 *         schema:
 *           $ref: '#/components/schemas/PageNumber'
 *       - in: query
 *         name: OrderBy
 *         schema:
 *           type: string
 *           enum:
 *             - title
 *             - author
 *       - in: query
 *         name: Ordering
 *         schema:
 *           $ref: '#/components/schemas/Ordering'
 *     responses:
 *       200:
 *         description: All Books Retrieved Successfully.
 *       409:
 *         description: No Books Exist in the Database.
 */
BookRouter.get('/getAllBooks', BookController.getAllBooks);

/**
 * @openapi
 * /book/getBookById/{bookId}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get Book By Id.
 *     description: API used to get Book By Id...
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Book Retrieved Successfully By Id.
 *       409:
 *         description: This Book does not Exist.
 */
BookRouter.get('/getBookById/:bookId', BookController.getBookById);

/**
 * @openapi
 * /book/update/{bookId}:
 *   put:
 *     tags:
 *       - Book
 *     summary: Update Book Record.
 *     description: API used to update Book Record...
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book Record Updated Successfully.
 *       409:
 *         description: This Book does not Exist.
 */
BookRouter.put('/update/:bookId', BookController.updateBook);

/**
 * @openapi
 * /book/delete/{bookId}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Delete Book Record.
 *     description: API used to delete Book Record...
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Book Record Deleted Successfully.
 *       409:
 *         description: This Book does not Exist.
 */
BookRouter.delete('/delete/:bookId', BookController.deleteBook);

export default BookRouter;