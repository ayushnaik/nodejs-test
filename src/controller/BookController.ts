/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import logger from 'jet-logger';
import OutputResponseDto from '@src/resources/OutputResponseDto';
import BookService from '@src/services/BookService';

class BookController{
  /* The `createBook` method in the `BookController` class is an asynchronous function that handles the
 creation of a book. It takes three parameters: `req`, `res`, and `next`, which represent the
 request, response, and next middleware function respectively. */
  public createBook = async (
    req: any,
    res: any,
    next: any,
  ) => {
    logger.info('Inside createBook in BookController');
    try {
      const response: OutputResponseDto = await BookService.createBook(
        req.body,
      );
      res.status(response.status).send(response);
    } catch (error) {
      next(error);
    }
  };

  /* The `getBookById` method in the `BookController` class is an asynchronous function that handles
  the retrieval of a book by its ID. It takes three parameters: `req`, `res`, and `next`, which
  represent the request, response, and next middleware function respectively. */
  public getBookById = async (
    req: any,
    res: any,
    next: any,
  ) => {
    logger.info('Inside getBookById in BookController');
    try {
      const response: OutputResponseDto = await BookService.getBookById(
        req.params.bookId,
      );
      res.status(response.status).send(response);
    } catch (error) {
      next(error);
    }
  };

  /* The `updateBook` method in the `BookController` class is an asynchronous function that handles the
  updating of a book. It takes three parameters: `req`, `res`, and `next`, which represent the
  request, response, and next middleware function respectively. */
  public updateBook = async (req: any, res: any, next: any) => {
    logger.info('Inside updateBook in BookController');

    try {

      const response: OutputResponseDto = await BookService.updateBook(
        req.params.bookId,
        req.body,
      );
      res.status(response.status).send(response);
    } catch (error) {
      next(error);
    }
  };

  /* The `getAllBooks` method in the `BookController` class is an asynchronous function that handles
  the retrieval of all books. It takes three parameters: `req`, `res`, and `next`, which represent
  the request, response, and next middleware function respectively. */
  public getAllBooks = async (
    req: any,
    res: any,
    next: any,
  ) => {
    logger.info('Inside getAllBooks in BookController');
    try {
      const response: OutputResponseDto = await BookService.getAllBooks(
        req.query.SearchString,
        req.query.PageSize,
        req.query.PageNumber,
        req.query.OrderBy,
        req.query.Ordering,
      );
      res.status(response.status).send(response);
    } catch (error) {
      next(error);
    }
  };

  /* The `deleteBook` method in the `BookController` class is an asynchronous function that handles the
  deletion of a book. It takes three parameters: `req`, `res`, and `next`, which represent the
  request, response, and next middleware function respectively. */
  public deleteBook = async (
    req: any,
    res: any,
    next: any,
  ) => {
    logger.info('Inside deleteBook in BookController');
    try {
      const response: OutputResponseDto = await BookService.deleteBook(
        req.params.bookId,
      );
      res.status(response.status).send(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new BookController();