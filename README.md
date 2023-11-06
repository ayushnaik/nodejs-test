# Book Management API

This is a simple Book Management API that allows users to perform CRUD operations on a collection of books. The application utilizes MongoDB to store book data and includes a video demonstration of the CRUD operations.

## Available Scripts

### `npm run dev`

Run the server in development mode.

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.

## Features

- **CRUD Operations**: Users can perform the following CRUD operations:
  - Add a new book (title, author, summary)
  - View a list of all books
  - View details of a specific book by its ID
  - Update a book's details
  - Delete a book

- **Database**: The application uses MongoDB for storing book data.

- **Video Demonstration**: A video demonstration showcasing all CRUD operations is available. The video covers various test cases, including edge cases such as attempting to view, update, or delete a non-existent book. You can watch the video on [Google Drive](https://drive.google.com/file/d/13Q0D4LJ4fkjuiJXGSRPXs6ZyTAJPq_ky/view?usp=drive_link).

## API Endpoints

The API offers the following endpoints:

- `POST /api/book/create`: Create a new book by providing title, author, and summary in the request body.

- `GET /api/book/getAllBooks`: Retrieve a list of all books.

- `GET /api/book/:bookId`: Get the details of a specific book by providing its unique ID.

- `PUT /api/book/:bookId`: Update the details of a specific book by providing its unique ID in the URL and the updated book information in the request body.

- `DELETE /api/book/:bookId`: Delete a book by providing its unique ID.

## Local Setup

To run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ayushnaik/nodejs-test.git

   cd node-app
   npm i
   npm run dev

The API will be accessible at <https://code-challenge-rv8j.onrender.com> and api documentation or Swagger fill be at The API will be accessible at <https://code-challenge-rv8j.onrender.com/apiDocs>.
