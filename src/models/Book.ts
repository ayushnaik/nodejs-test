/* eslint-disable max-len */
import mongoose, { Document, Schema } from 'mongoose';

/* The code is defining a Mongoose schema for a book. */
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
}, { timestamps: true });

/* The code is defining an interface called `IBook` that extends the `Document` interface provided by
Mongoose. This interface specifies the structure of a book document in the MongoDB database. It
includes three properties: `title`, `author`, and `summary`, all of which are of type `string`. By
defining this interface, you can ensure that any book document retrieved from the database or
created using Mongoose methods adheres to this structure. */
export interface IBook extends Document {
  title: string;
  author: string;
  summary: string
}

/* The code `export default mongoose.model<IBook>('Book', bookSchema);` is exporting a Mongoose model
for the book schema. */
export default mongoose.model<IBook>(
  'Book',
  bookSchema,
);