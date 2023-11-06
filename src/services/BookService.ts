/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import OutputResponseDto from '@src/resources/OutputResponseDto';
import logger from 'jet-logger';
import Book from '@src/models/Book';

class BookService {
  /* The `createBook` method is a public method of the `BookService` class. It is an asynchronous
  function that takes an argument `newBook` of type `any`. */
  public createBook = async (newBook: any) => {
    logger.info('Inside createBook in BookService');

    try {
      const bookExist: any = await Book.findOne({ title: newBook.title });

      if (bookExist) {
        return new OutputResponseDto(
          false,
          409,
          'This Book already Exist.',
          {},
          {},
        );
      }

      const book = new Book(newBook);

      await book.save();
        
      return new OutputResponseDto(
        true,
        200,
        'Book Record Created Successfully.',
        book,
        {},
      );
    } catch (error: any) {
      logger.err(
        `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
      );
      throw error;
    }
  };

  /* The `getBookById` method is a public method of the `BookService` class. It is an asynchronous
  function that takes an argument `bookId` of type `string`. */
  public getBookById = async (bookId: string) => {
    logger.info('Inside getBookById in BookService');

    try {
      const book: any = await Book.findOne({ _id: bookId });

      if (!book) {
        return new OutputResponseDto(
          false,
          409,
          'This Book does not Exist.',
          {},
          {},
        );
      }
        
      return new OutputResponseDto(
        true,
        200,
        'Book Record Created Successfully.',
        book,
        {},
      );
    } catch (error: any) {
      logger.err(
        `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
      );
      throw error;
    }
  };
    
  /* The `updateBook` method is a public method of the `BookService` class. It is an asynchronous
  function that takes two arguments: `bookId` of type `string` and `newBook` of type `any`. */
  public updateBook = async (bookId: string, newBook: any) => {
    logger.info('Inside updateBook in BookService');

    try {
      const book: any = await Book.findOne({ _id: bookId });

      if (!book) {
        return new OutputResponseDto(
          false,
          409,
          'This Book does not Exist.',
          {},
          {},
        );
      }
        
      await Book.updateOne({ _id: bookId }, newBook);
        
      return new OutputResponseDto(
        true,
        200,
        'Book Record Updated Successfully.',
        {},
        {},
      );
    } catch (error: any) {
      logger.err(
        `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
      );
      throw error;
    }
  };
    
  /* The `getAllBooks` method is a public method of the `BookService` class. It is an asynchronous
  function that retrieves a list of books based on the provided search criteria and pagination
  parameters. */
  public getAllBooks = async (
    SearchString: string,
    PageSize: number,
    PageNumber: number,
    OrderBy: string,
    Ordering: string,
  ) => {
    logger.info('Inside getAllBooks in BookService');

    try {
        

      const searchMatch: any = { $match: {} };
      if (SearchString) {
        searchMatch.$match = {
          $or: [
            {
              title: {
                $regex: '.*' + SearchString + '.*',
                $options: 'i',
              },
            },
            {
              author: {
                $regex: '.*' + SearchString + '.*',
                $options: 'i',
              },
            },
          ],
        };
      }

      PageNumber = Math.max(0, PageNumber - 1);

      const order: any = {};
      if (OrderBy && Ordering) {
        if (OrderBy == 'title') order.title = Ordering == 'ASC' ? 1 : -1;
        if (OrderBy == 'author') order.author = Ordering == 'ASC' ? 1 : -1;
      } else order.createdAt = 1;

      const pagination = {
        $facet: {
          page: [
            { $sort: order },
            { $skip: PageSize * PageNumber },
            { $limit: Number(PageSize) },
          ],
          total: [{ $count: 'totalItems' }],
        },
      };
      let books: any = await Book.aggregate([
        searchMatch,
        pagination,
      ]);

      books = {
        page: books[0].page,
        totalItems: books[0].total[0] ? books[0].total[0].totalItems : 0,
      };
        
      if (books.page.length === 0) {
        return new OutputResponseDto(
          false,
          409,
          'No Books Exist in the Database.',
          {},
          {},
        );
      }
        
      return new OutputResponseDto(
        true,
        200,
        'All Books Retrieved Successfully.',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        books,
        {},
      );
    } catch (error: any) {
      logger.err(
        `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
      );
      throw error;
    }
  };
    
  /* The `deleteBook` method is a public method of the `BookService` class. It is an asynchronous
  function that takes an argument `bookId` of type `string`. */
  public deleteBook = async (bookId: string) => {
    logger.info('Inside deleteBook in BookService');

    try {
      const book: any = await Book.findOne({ _id: bookId });

      if (!book) {
        return new OutputResponseDto(
          false,
          409,
          'This Book does not Exist.',
          {},
          {},
        );
      }
        
      await Book.deleteOne({ _id: bookId });
        
      return new OutputResponseDto(
        true,
        200,
        'Book Record Deleted Successfully.',
        {},
        {},
      );
    } catch (error: any) {
      logger.err(
        `name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`,
      );
      throw error;
    }
  };
}

export default new BookService();